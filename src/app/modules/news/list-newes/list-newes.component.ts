import { PERMISSIONS } from '../../../../assets/configs/perm.config';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogConfig, ConfirmDialogComponent } from './../../../core/shared/components/confirm-dialog/confirm-dialog.component';
import { DEFAULT_SORT, ITEMS_PER_PAGE } from 'src/assets/configs/app.config';
import { MessageService } from './../../../core/services/message.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TableColumnModel } from '../../../core/model/listing.model';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LAYOUT_CONFIG } from 'src/assets/configs/layout.config';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, Subscription } from 'rxjs';
import { ListingService } from './../../../core/services/listing.service';
import { DetailNewsComponent } from '../detail-news/detail-news.component';
import { News } from 'src/app/core/model/news.model';
import { NewsService } from 'src/app/core/services/news.service';
import { SortPayload } from 'src/app/core/model/ultils.model';
import { SystemSettingService } from 'src/app/core/services/system-setting.service';
import { DownloadFileNameComponent, DownloadFileNameConfig } from 'src/app/core/shared/components/download/download-file-name/download-file-name.component';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-list-newes',
  templateUrl: './list-newes.component.html',
  styleUrls: ['./list-newes.component.scss']
})
export class ListNewesComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  private subscriptions = new Subscription();

  LAYOUT_CONFIG = LAYOUT_CONFIG;
  PERMISSIONS = PERMISSIONS;

  displayedColumns: TableColumnModel = {
    'index': { title: 'STT', key: 'index', minWidth: '80px' },
    'avatar': { title: 'Ảnh đại diện', key: 'avatar', minWidth: '200px', width: '220px' },
    'title': { title: 'Tên bản tin', sort: DEFAULT_SORT, key: 'title', minWidth: '200px', maxWidth: '200px' },
    'description': { title: 'Trích dẫn', sort: DEFAULT_SORT, key: 'description', minWidth: '260px', maxWidth: '300px' },
    'status': { title: 'Trạng thái', sort: DEFAULT_SORT, key: 'status', minWidth: '150px'},
    'createdAt': { title: 'Ngày tạo', sort: DEFAULT_SORT, key: 'createdAt', minWidth: '150px' },
    'createdUser.name': { title: 'Người tạo', sort: DEFAULT_SORT, key: 'createdUser.name', minWidth: '220px' },
    'updatedAt': { title: 'Ngày sửa', sort: DEFAULT_SORT, key: 'createdAt', minWidth: '150px' },
    'updatedUser.name': { title: 'Người sửa', sort: DEFAULT_SORT, key: 'updatedUser.name', minWidth: '220px' },
    'action': { title: 'Tùy chọn', key: 'action', width: '140px', minWidth: '140px' }
  };
  currentSort = 'title';

  newses: News[] = [];

  // Table Pagination
  pageSize;
  pageStart = 1;
  currentPage = this.pageStart;
  totalItems: number;

  // Fixed Sidebar
  toolbarHeightFull = 180;
  toolbarHeightCollapse = 70;
  toolbarHeight = this.toolbarHeightCollapse;

  // templateVar
  isLoadingTable = false;
  showFilterForm = false;

  searchForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private newsService: NewsService,
    public listingService: ListingService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private systemSettingService: SystemSettingService
  ) {
    this.pageSize = systemSettingService.getSetting()?.pageSizes[0];

    // Search
    this.searchForm = this.fb.group({ textSearch: '' });
    this.searchForm.controls['textSearch'].valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((textSearch) => {
        this.getLstNews();
      });
  }

  ngOnInit(): void {
    this.getLstNews();
  }

  getLstNews(isExport?: boolean) {
    window.scrollTo(0, 0);

    const textSearch = this.searchForm.controls['textSearch'].value.trim();
    const sortKey = this.displayedColumns[this.currentSort].sortKey ?? this.currentSort;
    const sort: SortPayload | null = this.currentSort ? { sortKey , sortType : this.displayedColumns[this.currentSort].sort } : null;
    
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
    let subscription: any;

    if(isExport){
      this.spinner.show();
      subscription = this.newsService
      .getNews(undefined, undefined , [textSearch], sort, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (resExport) => {
          this.spinner.hide();
  
          const confirmConfig: DownloadFileNameConfig = {
            fileName: "Danh sách tin tức"
          }
          const downloadFileNameDialog = this.dialog.open(DownloadFileNameComponent, {
            data: confirmConfig,
            panelClass: 'cb-confirm-dialog',
            disableClose : true,
          });
          downloadFileNameDialog.afterClosed().subscribe(result => {
            if (result.action.data === 'accept') {
              FileSaver.saveAs(resExport.body, result.fileName + '.xlsx');
            }
          });
  
        },
        (errExportCalls) => {
          this.spinner.hide();
          this.messageService.showMessage('error', 'Danh sách tin tức', 'Lỗi khi xuất báo cáo');
        }
      );

    } else {
      this.setTableLoading(true);
      subscription = this.newsService
        .getNews(this.currentPage, this.pageSize , [textSearch], sort)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (resGetNewses) => {
            this.setTableLoading(false);
            if (resGetNewses?.data?.newses) {
              this.newses = resGetNewses.data.newses.map(
                (news: News, index: number) => {
                  news.index = this.pageSize * (this.currentPage - 1)  + index + 1;
                  news.createdAt =  news?.createdAt ? news?.createdAt * 1000 : undefined;
                  news.updatedAt =   news?.updatedAt ? news?.updatedAt * 1000 : undefined;
                  return news;
                });
              this.totalItems = resGetNewses.data.total;
              this.cdr.detectChanges();
            } else {
              this.messageService.showMessage('error', 'Danh sách tin tức', 'Có lỗi xảy ra');
            }
          },
          (errGetNews) => {
            this.messageService.showMessage('error', 'Danh sách tin tức', 'Có lỗi xảy ra');
            this.setTableLoading(false);
          }
        );
  
    }

    this.subscriptions.add(subscription);

  }

  setTableLoading(isLoading: boolean) {
    if (isLoading) {
      this.newses.length = 0; this.newses = [];
      for (let i = 0; i < this.pageSize; i++) {
        this.newses.push(new News());
      }
      this.isLoadingTable = true;
    } else {
      this.newses.length = 0; this.newses = [];
      this.isLoadingTable = false;
    }
    this.cdr.detectChanges();
  }

  tableSort(column: string) {
    Object.keys(this.displayedColumns).forEach((col: string) => {
      if (this.displayedColumns[col]?.sort) {
        if (column == col) {
          // sort current column
          if (this.currentSort == column) {
            this.displayedColumns[col].sort = this.displayedColumns[col].sort == 'asc' ? 'desc' : 'asc';
          } else {
            this.displayedColumns[col].sort = DEFAULT_SORT;
          }
        } else {
          this.displayedColumns[col].sort = DEFAULT_SORT;
        }
      }
    });
    // non-null assertion operator 
    this.currentSort = this.displayedColumns[column].sortKey ?? column;
    this.getLstNews();
  }


  pageChanged($event: number) {
    this.currentPage = $event;
    this.getLstNews();
  }

  itemPerPageChange($event: any) {
    this.pageSize = $event;
    this.currentPage = this.pageStart;
    this.getLstNews();
  }

  isSticky(column: string): boolean {
    return column === 'action' ? true : false;
  }

  removeNews(news: News) {
    if (!news.id) {
      return;
    }
    const confirmConfig: ConfirmDialogConfig = {
      icon: 'error_outline',
      iconColor: 'danger',
      mainTitle: 'Xóa tin tức',
      message: 'Bạn có muốn xóa tin tức đang chọn không?',
      actionButtons: [
        { type: 'secondary', label: 'Hủy bỏ', data: false },
        { type: 'danger', label: 'Đồng ý', data: true }
      ]
    }
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: confirmConfig,
      panelClass: 'cb-confirm-dialog'
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result.data === true) {
        this.spinner.show();
        this.newsService.removeNews(news?.id).subscribe(
          resRemove => {
            this.messageService.clearAll();
            this.messageService.showMessage('success', 'Tin tức', 'Xóa thành công');
            this.spinner.hide();
            this.getLstNews();
          },
          resRemove => {
            this.messageService.clearAll();
            this.messageService.showMessage('error', 'Tin tức', 'Xóa không thành công');
            this.spinner.hide();
          }
        )
      }
    });
  }

  detailNews(action: 'add' | 'edit' | 'view' , news?: News ) {
    const configDialog = this.dialog.open(DetailNewsComponent, {
      height: '100vh',
      minWidth: '900px',
      maxWidth: '900px',
      panelClass: 'cb-config-dialog',
      disableClose: true,
      position: {
        top: '0px',
        right: '0px',
      },
      data: {
        action: action,
        news: news
      },
    });
    configDialog.afterClosed().subscribe((resultUpdate) => {
      if (resultUpdate && resultUpdate.updated && action !== 'view' ) {
        this.getLstNews();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
    this.subscriptions.unsubscribe();
  }

}
