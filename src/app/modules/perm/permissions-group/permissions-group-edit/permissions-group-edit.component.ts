import { FormGroup } from '@angular/forms';
import { PERMISSIONS } from '../../../../../assets/configs/perm.config';
import { PermGroup, Permission, PermissionsSetting, Resource } from '../../../../core/model/permissions.model';
import { PermissionsService } from '../../../../core/services/permissions.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from '../../../../core/services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { ListingService } from '../../../../core/services/listing.service';
import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { LAYOUT_CONFIG } from 'src/assets/configs/layout.config';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { PermissionsGroupEditPermsComponent } from './permissions-group-edit-perms/permissions-group-edit-perms.component';
import { PermissionsGroupEditFormComponent } from './permissions-group-edit-form/permissions-group-edit-form.component';

@Component({
  selector: 'app-permissions-group-edit',
  templateUrl: './permissions-group-edit.component.html',
  styleUrls: ['./permissions-group-edit.component.scss']
})
export class PermissionsGroupEditComponent implements OnInit, OnDestroy {
  @ViewChild('groupConfigForm', { static: true }) groupConfigForm: PermissionsGroupEditFormComponent;
  @ViewChild('groupConfigPerms', { static: true }) groupConfigPerms: PermissionsGroupEditPermsComponent;

  // Fixed Sidebar
  toolbarHeightFull = 410;
  toolbarHeightCollapse = 66;
  toolbarHeight = this.toolbarHeightFull;
  showForm = true;

  private destroy$ = new Subject();

  LAYOUT_CONFIG = LAYOUT_CONFIG;
  PERMISSIONS = PERMISSIONS;


  constructor(
    public listingService: ListingService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private permissionsService: PermissionsService
  ) {
  }

  showEditForm() {
    this.showForm = !this.showForm;
    this.toolbarHeight = this.showForm ? this.toolbarHeightFull : this.toolbarHeightCollapse;
  }

  ngOnInit(): void {
    console.log(this.groupConfigForm.permGroupForm.value)
    console.log(this.groupConfigPerms.permissions)
  }

  savePermissionGroup(){

  }

  close(){
    this.router.navigate(['/perm', 'permissions-group'])
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
  }

}
