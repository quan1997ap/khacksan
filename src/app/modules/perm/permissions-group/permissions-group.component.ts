import { PermissionsService } from './../../../core/services/permissions.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DEFAULT_SORT } from 'src/assets/configs/app.config';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LAYOUT_CONFIG } from 'src/assets/configs/layout.config';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, Subscription } from 'rxjs';
import { SortPayload } from 'src/app/core/model/ultils.model';
import { SystemSettingService } from 'src/app/core/services/system-setting.service';
import { ListingService } from 'src/app/core/services/listing.service';
import { TableColumnModel } from 'src/app/core/model/listing.model';
import { MessageService } from 'src/app/core/services/message.service';
import { ConfirmDialogConfig, ConfirmDialogComponent } from 'src/app/core/shared/components/confirm-dialog/confirm-dialog.component';
import { APPLY_TYPES, PERMISSIONS, PERMISSION_SCOPES } from 'src/assets/configs/perm.config';
import { PermissionsGroup } from 'src/app/core/model/permissions.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-permissions-group',
  templateUrl: './permissions-group.component.html',
  styleUrls: ['./permissions-group.component.scss']
})
export class PermissionsGroupComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  private subscriptions = new Subscription();

  LAYOUT_CONFIG = LAYOUT_CONFIG;
  PERMISSIONS = PERMISSIONS;
  PERMISSION_SCOPES = PERMISSION_SCOPES;
  APPLY_TYPES = APPLY_TYPES;

  displayedColumns: TableColumnModel = {
    'index': { title: 'STT', key: 'index', minWidth: '80px' },
    'type': { title: 'Phạm vi phân quyền', sort: DEFAULT_SORT, key: 'type', minWidth: '220px', width: '250px' },
    'code': { title: 'Mã nhóm quyền', sort: DEFAULT_SORT, key: 'code', minWidth: '150px', maxWidth: '250px' },
    'applyType': { title: 'Loại nhóm quyền', sort: DEFAULT_SORT, key: 'applyType', minWidth: '200px', maxWidth: '250px' },
    'name': { title: 'Tên nhóm quyền', sort: DEFAULT_SORT, key: 'name', minWidth: '220px', maxWidth: '250px' },
    'status': { title: 'Trạng thái', sort: DEFAULT_SORT, key: 'status', minWidth: '150px'},
    'createdAt': { title: 'Ngày tạo', sort: DEFAULT_SORT, key: 'createdAt', minWidth: '150px' },
    'createdUser.name': { title: 'Người tạo', sort: DEFAULT_SORT, key: 'createdUser.name', minWidth: '220px' },
    'updatedAt': { title: 'Ngày sửa', sort: DEFAULT_SORT, key: 'createdAt', minWidth: '150px' },
    'updatedUser.name': { title: 'Người sửa', sort: DEFAULT_SORT, key: 'updatedUser.name', minWidth: '220px' },
    'action': { title: 'Tùy chọn', key: 'action', width: '140px', minWidth: '140px' }
  };
  currentSort = 'type';

  permissionsGroups: PermissionsGroup[] = [];

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
    public listingService: ListingService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private systemSettingService: SystemSettingService,
    private permissionsService: PermissionsService,
    private router: Router
  ) {
    this.pageSize = systemSettingService.getSetting()?.pageSizes[0];

    // Search
    this.searchForm = this.fb.group({ textSearch: '' });
    this.searchForm.controls['textSearch'].valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((textSearch) => {
        this.getPermissionsGroups();
      });
  }

  showFilter() {
    this.showFilterForm = !this.showFilterForm;
    this.toolbarHeight = this.showFilterForm ? this.toolbarHeightFull : this.toolbarHeightCollapse;
  }

  ngOnInit(): void {
    this.getPermissionsGroups();
  }
  

  getPermissionsGroups() {
    window.scrollTo(0, 0);
    this.setTableLoading(true);
    
    const textSearch = this.searchForm.controls['textSearch'].value.trim();
    const sortKey = this.displayedColumns[this.currentSort].sortKey ?? this.currentSort;
    const sort: SortPayload | null = this.currentSort ? { sortKey , sortType : this.displayedColumns[this.currentSort].sort } : null;

    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
    let subscription: any;

    subscription = this.permissionsService
      .getPermissionGroups(this.currentPage, this.pageSize , [textSearch], sort)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (resGetGroupPerm) => {
          this.setTableLoading(false);
          if (resGetGroupPerm?.data?.permissionGroups) {
            this.permissionsGroups = resGetGroupPerm.data.permissionGroups.map(
              (permGroup: PermissionsGroup, index: number) => {
                permGroup.index = this.pageSize * (this.currentPage - 1)  + index + 1;
                permGroup.createdAt =  permGroup?.createdAt ? permGroup?.createdAt * 1000 : undefined;
                permGroup.updatedAt =   permGroup?.updatedAt ? permGroup?.updatedAt * 1000 : undefined;
                return permGroup;
              });
            this.totalItems = resGetGroupPerm.data.total;
            this.cdr.detectChanges();
          } else {
            this.messageService.showMessage('error', 'Danh sách nhóm quyền', 'Có lỗi xảy ra');
          }
        },
        (errGetPermissionsGroup) => {
          this.messageService.showMessage('error', 'Danh sách nhóm quyền', 'Có lỗi xảy ra');
          this.setTableLoading(false);
        }
      );


    this.subscriptions.add(subscription);

  }

  setTableLoading(isLoading: boolean) {
    if (isLoading) {
      this.permissionsGroups.length = 0; this.permissionsGroups = [];
      for (let i = 0; i < this.pageSize; i++) {
        this.permissionsGroups.push(new PermissionsGroup());
      }
      this.isLoadingTable = true;
    } else {
      this.permissionsGroups.length = 0; this.permissionsGroups = [];
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
    this.getPermissionsGroups();
  }


  pageChanged($event: number) {
    this.currentPage = $event;
    this.getPermissionsGroups();
  }

  itemPerPageChange($event: any) {
    this.pageSize = $event;
    this.currentPage = this.pageStart;
    this.getPermissionsGroups();
  }

  isSticky(column: string): boolean {
    return column === 'action' ? true : false;
  }

  removePermissionsGroup(group: PermissionsGroup) {
    if (!group.id) {
      return;
    }
    const confirmConfig: ConfirmDialogConfig = {
      icon: 'error_outline',
      iconColor: 'danger',
      mainTitle: 'Xóa nhóm quyền',
      message: 'Bạn có muốn xóa nhóm quyền đang chọn không?',
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
        this.permissionsService.removePermissionGroup(group?.id).subscribe(
          resRemove => {
            this.messageService.clearAll();
            this.messageService.showMessage('success', 'Nhóm quyền', 'Xóa thành công');
            this.spinner.hide();
            this.getPermissionsGroups();
          },
          resRemove => {
            this.messageService.clearAll();
            this.messageService.showMessage('error', 'Nhóm quyền', 'Xóa không thành công');
            this.spinner.hide();
          }
        )
      }
    });
  }

  detailPermissionsGroup(action: 'add' | 'edit' | 'view' , permGroup?: PermissionsGroup ) {
    if( action == 'add') {
      this.router.navigate([ '/perm', 'permissions-group','add'])
    } else {
      this.router.navigate(['/perm', 'permissions-group', 'detail', permGroup?.id, action ])
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
    this.subscriptions.unsubscribe();
  }

}
