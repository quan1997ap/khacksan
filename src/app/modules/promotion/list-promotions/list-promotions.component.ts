import { PERMISSIONS } from '../../../../assets/configs/perm.config';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogConfig, ConfirmDialogComponent } from './../../../core/shared/components/confirm-dialog/confirm-dialog.component';
import { DEFAULT_SORT } from 'src/assets/configs/app.config';
import { MessageService } from './../../../core/services/message.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TableColumnModel } from '../../../core/model/listing.model';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LAYOUT_CONFIG } from 'src/assets/configs/layout.config';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, Subscription } from 'rxjs';
import { ListingService } from './../../../core/services/listing.service';
import { News } from 'src/app/core/model/news.model';
import { SortPayload } from 'src/app/core/model/ultils.model';
import { SystemSettingService } from 'src/app/core/services/system-setting.service';
import { DownloadFileNameComponent, DownloadFileNameConfig } from 'src/app/core/shared/components/download/download-file-name/download-file-name.component';
import { PromotionsService } from 'src/app/core/services/promotion.service';
import * as FileSaver from 'file-saver';
import { DetailPromotionComponent } from '../detail-promotion/detail-promotion.component';

@Component({
  selector: 'app-list-promotions',
  templateUrl: './list-promotions.component.html',
  styleUrls: ['./list-promotions.component.scss']
})
export class ListPromotionsComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  private subscriptions = new Subscription();

  LAYOUT_CONFIG = LAYOUT_CONFIG;
  PERMISSIONS = PERMISSIONS;

  displayedColumns: TableColumnModel = {
    'index': { title: 'STT', key: 'index', minWidth: '80px' },
    'info': { title: 'Tên khuyến mãi', key: 'info', minWidth: '200px', width: '220px' },
    'acreage': { title: 'Diện tích( m2 )', sort: DEFAULT_SORT, key: 'acreage', minWidth: '200px', maxWidth: '200px' },
    'capacity': { title: 'Sức chứa ( người )', sort: DEFAULT_SORT, key: 'capacity', minWidth: '260px', maxWidth: '300px' },
    'roomCount': { title: 'Tổng SL phòng', sort: DEFAULT_SORT, key: 'roomCount', minWidth: '260px', maxWidth: '300px' },
    'capacityAvailable': { title: 'SL phòng sẵn có', sort: DEFAULT_SORT, key: 'capacityAvailable', minWidth: '150px'},
    'price': { title: 'Giá phòng / đêm', sort: DEFAULT_SORT, key: 'price', minWidth: '150px'},
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
    private promotionsService: PromotionsService,
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
        this.getLstRooms();
      });
  }

  ngOnInit(): void {
    this.getLstRooms();
  }

  getLstRooms(isExport?: boolean) {
    window.scrollTo(0, 0);

    const textSearch = this.searchForm.controls['textSearch'].value.trim();
    const sortKey = this.displayedColumns[this.currentSort].sortKey ?? this.currentSort;
    const sort: SortPayload | null = this.currentSort ? { sortKey , sortType : this.displayedColumns[this.currentSort].sort } : null;
    
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
    let subscription: any;

    if(isExport){
      this.spinner.show();
      subscription = this.promotionsService
      .getPromotions(null, null , [textSearch], sort, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (resExport) => {
          this.spinner.hide();
  
          const confirmConfig: DownloadFileNameConfig = {
            fileName: "Danh sách khuyến mãi"
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
          this.messageService.showMessage('error', 'Danh sách khuyến mãi', 'Lỗi khi xuất báo cáo');
        }
      );

    } else {
      this.setTableLoading(true);
      subscription = this.promotionsService
        .getPromotions(this.currentPage, this.pageSize , [textSearch], sort)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (listResponse) => {
            this.setTableLoading(false);
            if (listResponse?.data?.newses) {
              this.newses = listResponse.data.newses.map(
                (news: News, index: number) => {
                  news.index = this.pageSize * (this.currentPage - 1)  + index + 1;
                  news.createdAt =  news?.createdAt ? news?.createdAt * 1000 : undefined;
                  news.updatedAt =   news?.updatedAt ? news?.updatedAt * 1000 : undefined;
                  return news;
                });
              this.totalItems = listResponse.data.total;
              this.cdr.detectChanges();
            } else {
              this.messageService.showMessage('error', 'Danh sách khuyến mãi', 'Có lỗi xảy ra');
            }
          },
          (err) => {
            this.messageService.showMessage('error', 'Danh sách khuyến mãi', 'Có lỗi xảy ra');
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
    this.getLstRooms();
  }


  pageChanged($event: number) {
    this.currentPage = $event;
    this.getLstRooms();
  }

  itemPerPageChange($event: any) {
    this.pageSize = $event;
    this.currentPage = this.pageStart;
    this.getLstRooms();
  }

  isSticky(column: string): boolean {
    return column === 'action' ? true : false;
  }

  removeRoom(news: News) {
    if (!news.id) {
      return;
    }
    const confirmConfig: ConfirmDialogConfig = {
      icon: 'error_outline',
      iconColor: 'danger',
      mainTitle: 'Xóa khuyến mãi',
      message: 'Bạn có muốn xóa khuyến mãi đang chọn không?',
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
        this.promotionsService.removePromotion(news?.id).subscribe(
          resRemove => {
            this.messageService.clearAll();
            this.messageService.showMessage('success', 'khuyến mãi', 'Xóa thành công');
            this.spinner.hide();
            this.getLstRooms();
          },
          resRemove => {
            this.messageService.clearAll();
            this.messageService.showMessage('error', 'khuyến mãi', 'Xóa không thành công');
            this.spinner.hide();
          }
        )
      }
    });
  }

  detailRoom(action: 'add' | 'edit' | 'view' , news?: News ) {
    const configDialog = this.dialog.open(DetailPromotionComponent, {
      height: '100vh',
      minWidth: '700px',
      maxWidth: '700px',
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
        this.getLstRooms();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
    this.subscriptions.unsubscribe();
  }

}
