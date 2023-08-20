import { UPLOAD_IMG_TYPES } from 'src/assets/configs/app.config';
import { PERMISSIONS } from '../../../../../assets/configs/perm.config';
import { MessageService } from '../../../../core/services/message.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ValidateService } from 'src/app/core/services/form-validate.service';
import { CommonSystemSetting, UpdateSystemSettingPayload } from 'src/app/core/model/system-setting.model';
import { SystemSettingService } from 'src/app/core/services/system-setting.service';

@Component({
  selector: 'app-detail-system-setting',
  templateUrl: './detail-system-setting.component.html',
  styleUrls: ['./detail-system-setting.component.scss']
})

export class DetailSystemSettingComponent implements OnInit {
  PERMISSIONS = PERMISSIONS;
  UPLOAD_IMG_TYPES = UPLOAD_IMG_TYPES;
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DetailSystemSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { systemSetting: CommonSystemSetting },
    private dialog: MatDialog,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    public validateService: ValidateService,
    private systemSettingService: SystemSettingService
  ) {
    this.messageService.clearAll();
    this.editForm = this.fb.group(
      {
        uploadFileTypes: new FormControl([]),
        pageSizes: new FormArray([]),
        appTimeout: [null],
        webTimeout: [null],

        createdAt: [null],
        updatedAt: [null],
        createdBy: [null],
        updatedBy: [null],
        status: [true, [Validators.required]], // 1: active; 2: inactive
      }
    );

    if (this.data.systemSetting) {
      const createdAt = new Date(Number(this.data.systemSetting.createdAt));
      const updateAt = new Date(Number(this.data.systemSetting.createdAt));
      this.editForm.get('createdAt')?.patchValue(createdAt);
      this.editForm.get('createdBy')?.patchValue(this.data.systemSetting?.createdBy);

      this.editForm.get('updatedAt')?.patchValue(updateAt);
      this.editForm.get('updatedBy')?.patchValue(this.data.systemSetting?.updatedBy);
    }

    switch (data.systemSetting?.settingKey) {
      case "uploadFileTypes":
        this.editForm.get('uploadFileTypes')?.patchValue(data.systemSetting?.settingValue);
        break;
      case "pageSizes":
        this.clearFormArray(this.pageSizes)
        if (data.systemSetting?.settingValue?.length) {
          data.systemSetting?.settingValue.forEach((size: number) => {
            this.addPageSize(size);
          });
        }
        this.editForm.get('pageSizes')?.patchValue(data.systemSetting?.settingValue);
        break;
      case "appTimeout":
        this.editForm.get('appTimeout')?.patchValue(data.systemSetting?.settingValue);
        break;
      case "webTimeout":
        this.editForm.get('webTimeout')?.patchValue(data.systemSetting?.settingValue);
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
  }

  // Config pagesizes : https://angular.io/api/forms/FormArrayName
  get pageSizes() {
    return this.editForm.get('pageSizes') as FormArray;
  }

  addPageSize(size?: number): void {
    this.pageSizes.push(this.fb.control(size, [Validators.required]));
  }

  removePageSize(i: number): void {
    this.pageSizes.removeAt(i);
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }


  save() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      this.messageService.showMessage('error', 'Form thông tin không hợp lệ', 'Bạn phải điền đủ các thông tin bắt buộc');
      return;
    }

    let settingValue;
    switch (this.data.systemSetting?.settingKey) {
      case "uploadFileTypes":
        settingValue = this.editForm.get('uploadFileTypes')?.value;
        break;
      case "pageSizes":
        settingValue =this.editForm.get('pageSizes')?.value;
        break;
      case "appTimeout":
        settingValue = this.editForm.get('appTimeout')?.value;
        break;
      case "webTimeout":
        settingValue = this.editForm.get('webTimeout')?.value;
        break;
      default:
        break;
    }

    const payload: UpdateSystemSettingPayload = {
      settingKey: this.data.systemSetting.settingKey,
      settingValue
    }

    this.spinner.show();
    this.systemSettingService.updateSetting(payload).subscribe(
      resUpdate => {
        this.messageService.showMessage('success', 'Cấu hình hệ thống', 'Cập nhật cấu hình thành công');
        this.spinner.hide();
        this.dialogRef.close({ updated: true });
      },
      errUpdate => {
        this.messageService.showMessage('error', 'Chỉnh sửa', `Cập nhật mục đích vay không thành công.  <div> ${errUpdate?.error?.message} </div>`);
        this.spinner.hide();
      }
    )

  }


  close() {
    this.dialogRef.close();
  }


  get sellerVal() {
    return this.editForm.getRawValue();
  }


  ngOnDestroy(): void {
  }
}
