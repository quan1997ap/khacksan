import { ValidateService } from '../../../../../core/services/form-validate.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { APPLY_TYPES, PERMISSION_SCOPES } from 'src/assets/configs/perm.config';
@Component({
  selector: 'app-permissions-group-edit-form',
  templateUrl: './permissions-group-edit-form.component.html',
  styleUrls: ['./permissions-group-edit-form.component.scss']
})
export class PermissionsGroupEditFormComponent implements OnInit {
  permGroupForm: FormGroup;
  types = PERMISSION_SCOPES;
  applyTypes = APPLY_TYPES
  departments = [];

  branchs = [];

  positions = [

  ]

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    public validateService: ValidateService,
  ) {
    this.permGroupForm = this.fb.group({
      id: [null, []],
      name: [null, [Validators.required]],
      description: [null, []],
      code: [null, [Validators.required]],
      type: [null, [Validators.required]], // 1: CMS; 2: APP
      applyType: [null, [Validators.required]], // 1: Cấp bậc; 2: user
      departmentIds: [[], [Validators.required]], // phòng ban
      positionIds: [[], [Validators.required]], // Chức danh
      branchIds: [[], [Validators.required]], // Chi nhánh
      permissionIds: [null, []],
      status: [true, []],
      createdAt: [null],
      updatedAt: [null],
      createdBy: [null],
      updatedBy: [null],
    });
  }

  ngOnInit(): void {

  }
}
