import { PermGroup, Permission, PermissionsSetting, Resource } from './../../../../../core/model/permissions.model';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LAYOUT_CONFIG } from 'src/assets/configs/layout.config';
import { Subject, takeUntil } from 'rxjs';
import { PERMISSIONS } from 'src/assets/configs/perm.config';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import { MessageService } from 'src/app/core/services/message.service';
import { ListingService } from 'src/app/core/services/listing.service';

@Component({
  selector: 'app-permissions-group-edit-perms',
  templateUrl: './permissions-group-edit-perms.component.html',
  styleUrls: ['./permissions-group-edit-perms.component.scss']
})
export class PermissionsGroupEditPermsComponent implements OnInit, OnDestroy {
  editPermGroupForm: FormGroup;
  private destroy$ = new Subject();


  permissionGroups: PermGroup[] = [];
  permissionsSetting: PermissionsSetting;
  permissions: Permission[] = [];
  settingForObjects: string[] = []; // app/cms


  constructor(
    public listingService: ListingService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private permissionsService: PermissionsService
  ) {
  }
  
  ngOnInit(): void {
    this.getPermissions();
  }

  getPermissions() {
    this.permissionsService
      .getPermissions()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (resGetPermissions) => {
          if (resGetPermissions && resGetPermissions.data) {
            this.settingForObjects = Object.keys(resGetPermissions.data); // cms,app
            this.permissionsSetting = resGetPermissions.data;
            this.settingForObjects.forEach(object => {
              // Mapping group
              this.permissionsSetting[object].permGroups = this.permissionsSetting[object].groups.map((groupName: string) => ({
                groupName: groupName,
                isExpand: true
              }))
              // Mapping permissions
              this.permissions = this.permissions.concat(
                this.permissionsSetting[object].permissions.map((perm: any) => {
                  perm.app = object;
                  return perm
                })
              );
              this.cdr.detectChanges();
            });
          } else {
            this.messageService.showMessage('error', 'Danh sách quyền', 'Lỗi khi lấy danh sách quyền');
          }
        },
        (errGetPermissions) => {
          this.messageService.showMessage('error', 'Danh sách quyền', 'Lỗi khi lấy danh sách quyền');
        }
      );
  }


  somePermsCheck(app: string, group: any, resourceName: string): boolean {
    if (!this.permissions?.length) {
      return false;
    }
    const groupPerms = this.permissions.filter(perm => perm.app == app && perm.group == group && perm.resource == resourceName);
    return groupPerms.filter(t => t.selected).length > 0 && !group.selectedAll;

  }

  /**
   * 
   * @param app : 'app', 'cms'
   */
  checkAllResourcePerms(isCheck: boolean, app: string, group: PermGroup, resource: Resource) {
    resource.selectedAll = isCheck;
    if (!this.permissions?.length) {
      return;
    }
    return this.permissions.filter(perm => perm.app == app && perm.group == group.groupName && perm.resource == resource.resource).forEach((p: Permission) => (p.selected = isCheck));
  }

  updateAllResourcePermsChecked(app: string, group: PermGroup, resource: Resource) {
    resource.selectedAll = this.permissions.filter(perm => perm.app == app && perm.group == group.groupName && perm.resource == resource.resource).every((p: Permission) => p.selected);
  }


  ngOnDestroy(): void {
    this.destroy$.next(null);  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
  }

}
