import { PERMISSIONS } from '../../../../../assets/configs/perm.config';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogConfig, ConfirmDialogComponent } from '../../../../core/shared/components/confirm-dialog/confirm-dialog.component';
import { DEFAULT_SORT } from 'src/assets/configs/app.config';
import { MessageService } from '../../../../core/services/message.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TableColumnModel } from '../../../../core/model/listing.model';
import { Component, OnInit, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { Subject, takeUntil, Subscription } from 'rxjs';
import { ListingService } from '../../../../core/services/listing.service';
import { News } from 'src/app/core/model/news.model';
import { SortPayload } from 'src/app/core/model/ultils.model';
import { SystemSettingService } from 'src/app/core/services/system-setting.service';
import { DownloadFileNameComponent, DownloadFileNameConfig } from 'src/app/core/shared/components/download/download-file-name/download-file-name.component';
import * as FileSaver from 'file-saver';
import { OrderService } from 'src/app/core/services/order.service';
import { DetailOrderComponent } from '../../detail-order/detail-order.component';

@Component({
  selector: 'app-list-app-orders',
  templateUrl: './list-app-orders.component.html',
  styleUrls: ['./list-app-orders.component.scss']
})
export class ListAppOrdersComponent implements OnInit, OnDestroy {
  @Input() searchForm: FormGroup;
  private destroy$ = new Subject();
  private subscriptions = new Subscription();
  PERMISSIONS = PERMISSIONS;

  displayedColumns: TableColumnModel = {
    'index': { title: 'STT', key: 'index', minWidth: '80px' },
    'info': { title: 'Mã đặt phòng', key: 'info', minWidth: '200px', width: '220px' },
    'acreage': { title: 'Loại phòng', sort: DEFAULT_SORT, key: 'acreage', minWidth: '200px', maxWidth: '200px' },
    'capacity': { title: 'Số lượng đặt', sort: DEFAULT_SORT, key: 'capacity', minWidth: '260px', maxWidth: '300px' },
    'roomCount': { title: 'Thời gian nhận phòng', sort: DEFAULT_SORT, key: 'roomCount', minWidth: '260px', maxWidth: '300px' },
    'capacityAvailable': { title: 'Thời gian trả phòng', sort: DEFAULT_SORT, key: 'capacityAvailable', minWidth: '150px' },
    'price': { title: 'Tổng giá trị đơn đặt', sort: DEFAULT_SORT, key: 'price', minWidth: '150px' },
    'prePay': { title: 'Cần thanh toán trước', sort: DEFAULT_SORT, key: 'prePay', minWidth: '150px' },
    'status': { title: 'Trạng thái', sort: DEFAULT_SORT, key: 'prePay', minWidth: '150px' },
    'customerName': { title: 'Họ tên khách hàng', sort: DEFAULT_SORT, key: 'customerName', minWidth: '150px' },
    'phone': { title: 'Số điện thoại khách hàng', sort: DEFAULT_SORT, key: 'phone', minWidth: '150px' },
    'action': { title: 'Tùy chọn', key: 'action', width: '140px', minWidth: '140px' }
  };
  currentSort = 'title';

  newses: News[] = [];

  // Table Pagination
  pageSize;
  pageStart = 1;
  currentPage = this.pageStart;
  totalItems: number;

  // Template Var
  isLoadingTable = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private orderService: OrderService,
    public listingService: ListingService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private systemSettingService: SystemSettingService
  ) {
    this.pageSize = systemSettingService.getSetting()?.pageSizes[0];
  }

  ngOnInit(): void {
    this.getLstRooms();
  }

  getLstRooms(isExport?: boolean) {
    window.scrollTo(0, 0);
    const textSearch = this.searchForm.controls['textSearch'].value.trim();
    const sortKey = this.displayedColumns[this.currentSort].sortKey ?? this.currentSort;
    const sort: SortPayload | null = this.currentSort ? { sortKey, sortType: this.displayedColumns[this.currentSort].sort } : null;

    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
    let subscription: any;

    if (isExport) {
      this.spinner.show();
      subscription = this.orderService
        .getOrders(null, null, [textSearch], sort, true)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (resExport) => {
            this.spinner.hide();

            const confirmConfig: DownloadFileNameConfig = {
              fileName: "Danh sách app order"
            }
            const downloadFileNameDialog = this.dialog.open(DownloadFileNameComponent, {
              data: confirmConfig,
              panelClass: 'cb-confirm-dialog',
              disableClose: true,
            });
            downloadFileNameDialog.afterClosed().subscribe(result => {
              if (result.action.data === 'accept') {
                FileSaver.saveAs(resExport.body, result.fileName + '.xlsx');
              }
            });

          },
          (errExportCalls) => {
            this.spinner.hide();
            this.messageService.showMessage('error', 'Danh sách app order', 'Lỗi khi xuất báo cáo');
          }
        );

    } else {
      this.setTableLoading(true);
      subscription = this.orderService
        .getOrders(this.currentPage, this.pageSize, [textSearch], sort)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (listResponse) => {
            this.setTableLoading(false);
            if (listResponse?.data?.newses) {
              this.newses = listResponse.data.newses.map(
                (news: News, index: number) => {
                  news.index = this.pageSize * (this.currentPage - 1) + index + 1;
                  news.createdAt = news?.createdAt ? news?.createdAt * 1000 : undefined;
                  news.updatedAt = news?.updatedAt ? news?.updatedAt * 1000 : undefined;
                  return news;
                });
              this.totalItems = listResponse.data.total;
              this.cdr.detectChanges();
            } else {
              this.messageService.showMessage('error', 'Danh sách order', 'Có lỗi xảy ra');
            }
          },
          (err) => {
            this.messageService.showMessage('error', 'Danh sách order', 'Có lỗi xảy ra');
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
      mainTitle: 'Xóa order',
      message: 'Bạn có muốn xóa order đang chọn không?',
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
        this.orderService.removeOrder(news?.id).subscribe(
          resRemove => {
            this.messageService.clearAll();
            this.messageService.showMessage('success', 'Order', 'Xóa thành công');
            this.spinner.hide();
            this.getLstRooms();
          },
          resRemove => {
            this.messageService.clearAll();
            this.messageService.showMessage('error', 'Order', 'Xóa không thành công');
            this.spinner.hide();
          }
        )
      }
    });
  }

  detailRoom(action: 'add' | 'edit' | 'view', news?: News) {
    const configDialog = this.dialog.open(DetailOrderComponent, {
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
      if (resultUpdate && resultUpdate.updated && action !== 'view') {
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
