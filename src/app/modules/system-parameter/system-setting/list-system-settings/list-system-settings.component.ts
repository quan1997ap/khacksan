import { PERMISSIONS } from '../../../../../assets/configs/perm.config';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from '../../../../core/services/message.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TableColumnModel } from '../../../../core/model/listing.model';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LAYOUT_CONFIG } from 'src/assets/configs/layout.config';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ListingService } from '../../../../core/services/listing.service';
import { SystemSettingService } from 'src/app/core/services/system-setting.service';
import { DetailSystemSettingComponent } from '../detail-system-setting/detail-system-setting.component';
import { CommonSystemSetting } from 'src/app/core/model/system-setting.model';

@Component({
  selector: 'app-list-system-settings',
  templateUrl: './list-system-settings.component.html',
  styleUrls: ['./list-system-settings.component.scss']
})
export class ListSystemSettingsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  private subscriptions = new Subscription();

  LAYOUT_CONFIG = LAYOUT_CONFIG;
  PERMISSIONS = PERMISSIONS;


  displayedColumns: TableColumnModel = {
    'index': { title: 'STT', key: 'index', minWidth: '80px' },
    'settingKey': { title: 'Thông tin', key: 'code', minWidth: '120px', maxWidth: '120px' },
    'settingValue': { title: 'Tham số', key: 'name', minWidth: '300px', maxWidth: '300px' },
    'createdAt': { title: 'Ngày tạo', key: 'createdAt', minWidth: '120px', maxWidth: '120px' },
    'createdUser.name': { title: 'Người tạo', key: 'createdUser.name', minWidth: '220px' },
    'updatedAt': { title: 'Ngày sửa', key: 'createdAt', minWidth: '120px', maxWidth: '120px' },
    'updatedUser.name': { title: 'Người sửa', key: 'updatedUser.name', minWidth: '220px' },

    'action': { title: 'Tùy chọn', key: 'action', width: '140px', minWidth: '140px' }
  };

  systemSettings: CommonSystemSetting[] = [];
  pageSize: number = 10;
  toolbarHeight = 60;

  // templateVar
  isLoadingTable = false;
  showFilterForm = false;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public listingService: ListingService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private systemSettingService: SystemSettingService
  ) {
  }


  ngOnInit(): void {
    this.loadSetting();
  }

  loadSetting(){
    window.scrollTo(0, 0);
    this.setTableLoading(true);
    this.systemSettingService.getSystemSettings()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resGetSetting) => {
        this.setTableLoading(false);
        const CMSSetting = this.systemSettingService.getCMSSetting(resGetSetting);
        this.systemSettingService.setSetting(CMSSetting)
        this.systemSettings = resGetSetting.map(
          (setting, index) => {
            setting.index = index;
            return setting;
          }
        );
        this.cdr.detectChanges();
      },
      error: (e) => {
        this.setTableLoading(false);
        this.messageService.showMessage( 'error', 'Cấu hình hệ thống', 'Lỗi khi lấy thông tin cấu hình hệ thống'  );
      }
    });
  }


  setTableLoading(isLoading: boolean) {
    if (isLoading) {
      this.systemSettings.length = 0; this.systemSettings = [];
      for (let i = 0; i < this.pageSize; i++) {
        this.systemSettings.push(new CommonSystemSetting());
      }
      this.isLoadingTable = true;
    } else {
      this.systemSettings.length = 0; this.systemSettings = [];
      this.isLoadingTable = false;
    }
    this.cdr.detectChanges();
  }

  isSticky(column: string): boolean {
    return column === 'action' ? true : false;
  }

  editSystemSetting(systemSetting?: CommonSystemSetting) {
    const configDialog = this.dialog.open(DetailSystemSettingComponent, {
      height: '100vh',
      minWidth: '600px',
      maxWidth: '800px',
      panelClass: 'cb-config-dialog',
      disableClose: true,
      autoFocus: false,
      position: {
        top: '0px',
        right: '0px',
      },
      data: {
        systemSetting: systemSetting,
      },
    });
    configDialog.afterClosed().subscribe((resultUpdate) => {
      if (resultUpdate && resultUpdate.updated && systemSetting?.settingKey === 'webTimeout') {
        setTimeout( () => {
          // Reload for AutoLogoutService
          document.location.reload();
        }, 1000)
      } else {
        this.loadSetting();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
    this.subscriptions.unsubscribe();
  }

}
