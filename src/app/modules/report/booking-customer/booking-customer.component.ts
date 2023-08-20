import { PERMISSIONS } from '../../../../assets/configs/perm.config';
import { NgxSpinnerService } from 'ngx-spinner';
import { DEFAULT_SORT, ITEMS_PER_PAGE } from 'src/assets/configs/app.config';
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
import { RoomService } from 'src/app/core/services/room.service';
import * as FileSaver from 'file-saver';
import { DateValidators } from 'src/app/core/shared/form/date-range.validator';

@Component({
  selector: 'app-booking-customer',
  templateUrl: './booking-customer.component.html',
  styleUrls: ['./booking-customer.component.scss']
})
export class BookingCustomerComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  private subscriptions = new Subscription();
  public today:any = new Date();

  LAYOUT_CONFIG = LAYOUT_CONFIG;
  PERMISSIONS = PERMISSIONS;

  displayedColumns: TableColumnModel = {
    'index': { title: 'STT', key: 'index', minWidth: '80px' },
    'info': { title: 'Kênh đặt', key: 'info', minWidth: '200px', width: '220px' },
    'acreage': { title: 'Ngày đặt', sort: DEFAULT_SORT, key: 'acreage', minWidth: '200px', maxWidth: '200px' },
    'capacity': { title: 'Mã phòng', sort: DEFAULT_SORT, key: 'capacity', minWidth: '260px', maxWidth: '300px' },
    'roomCount': { title: 'Tên khách sạn', sort: DEFAULT_SORT, key: 'roomCount', minWidth: '260px', maxWidth: '300px' },
    'capacityAvailable': { title: 'Tên khách hàng', sort: DEFAULT_SORT, key: 'capacityAvailable', minWidth: '150px'},
    'price1': { title: 'Loại phòng', sort: DEFAULT_SORT, key: 'price', minWidth: '150px'},
    'price11': { title: 'Số phòng', sort: DEFAULT_SORT, key: 'price', minWidth: '150px'},
    'price2': { title: 'Ngày nhận phòng', sort: DEFAULT_SORT, key: 'price', minWidth: '150px'},
    'price3': { title: 'Ngày trả phòng', sort: DEFAULT_SORT, key: 'price', minWidth: '150px'},
    'status': { title: 'Trạng thái', sort: DEFAULT_SORT, key: 'price', minWidth: '150px'},
    'price': { title: 'Chi phí đặt phòng', sort: DEFAULT_SORT, key: 'price', minWidth: '150px'},
    'time': { title: 'Ngày nhận phòng thực tế', sort: DEFAULT_SORT, key: 'price', minWidth: '150px'},
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

  filterForm: FormGroup;;

  bookingFroms = [];
  roomTypes = [];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private roomService: RoomService,
    public listingService: ListingService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private systemSettingService: SystemSettingService
  ) {
    this.pageSize = systemSettingService.getSetting()?.pageSizes[0];

    // Search
    this.filterForm = this.fb.group(
      {
        textSearch: [''], 
        fromDate: [null], 
        toDate: [null],
        customerType: [null],
        branch: [null],
        ocrStatus: [null]
      },
      { validator: DateValidators.rangeValidate('fromDate', 'toDate') }
    );

    this.filterForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(textSearch => {
        if( this.filterForm.valid ){
          this.currentPage = 1;
          this.getReport();
        }
      });
  }

  ngOnInit(): void {
    this.getReport();
  }

  showFilter() {
    this.showFilterForm = !this.showFilterForm;
    this.toolbarHeight = this.showFilterForm ? this.toolbarHeightFull : this.toolbarHeightCollapse;
  }

  getReport(isExport?: boolean) {
    window.scrollTo(0, 0);

    const textSearch = '' ; //this.searchForm.controls['textSearch'].value.trim();
    const sortKey = this.displayedColumns[this.currentSort].sortKey ?? this.currentSort;
    const sort: SortPayload | null = this.currentSort ? { sortKey , sortType : this.displayedColumns[this.currentSort].sort } : null;
    
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
    let subscription: any;

    if(isExport){
      this.spinner.show();
      subscription = this.roomService
      .getRooms(null, null , [textSearch], sort, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (resExport) => {
          this.spinner.hide();
  
          const confirmConfig: DownloadFileNameConfig = {
            fileName: "Danh sách loại phòng"
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
          this.messageService.showMessage('error', 'Danh sách loại phòng', 'Lỗi khi xuất báo cáo');
        }
      );

    } else {
      this.setTableLoading(true);
      subscription = this.roomService
        .getRooms(this.currentPage, this.pageSize , [textSearch], sort)
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
              this.messageService.showMessage('error', 'Danh sách loại phòng', 'Có lỗi xảy ra');
            }
          },
          (err) => {
            this.messageService.showMessage('error', 'Danh sách loại phòng', 'Có lỗi xảy ra');
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
    this.getReport();
  }


  pageChanged($event: number) {
    this.currentPage = $event;
    this.getReport();
  }

  itemPerPageChange($event: any) {
    this.pageSize = $event;
    this.currentPage = this.pageStart;
    this.getReport();
  }

  isSticky(column: string): boolean {
    return column === 'action' ? true : false;
  }


  ngOnDestroy(): void {
    this.destroy$.next(null);  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
    this.subscriptions.unsubscribe();
  }

}
