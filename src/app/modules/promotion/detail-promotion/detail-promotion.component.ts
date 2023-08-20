import { PERMISSIONS } from '../../../../assets/configs/perm.config';
import { MessageService } from './../../../core/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { CreateUpdateNewsPayload, News } from 'src/app/core/model/news.model';
import { ValidateService } from 'src/app/core/services/form-validate.service';
import { SEPARATOR_LIMIT } from 'src/assets/configs/app.config';
import { PromotionsService } from 'src/app/core/services/promotion.service';

@Component({
  selector: 'app-detail-promotion',
  templateUrl: './detail-promotion.component.html',
  styleUrls: ['./detail-promotion.component.scss']
})

export class DetailPromotionComponent implements OnInit {
  PERMISSIONS = PERMISSIONS;
  SEPARATOR_LIMIT = SEPARATOR_LIMIT;
  editForm: FormGroup;
  services = [];
  roomTypes = [];
  promotionTypes = [];
  
  constructor(
    public dialogRef: MatDialogRef<DetailPromotionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: 'add' | 'edit' | 'view' , news: News  },
    private dialog: MatDialog,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    public validateService: ValidateService,
    private promotionService: PromotionsService
  ) {
    this.messageService.clearAll();
    this.editForm = this.fb.group(
      {
        name: [null,  [Validators.required] ],
        startDate: [null,  [Validators.required] ],
        exceptedDate: [[] ],
        endDate: [null,  [Validators.required] ],
        roomType: [null,  [Validators.required] ],
        promotionType:  [null,  [Validators.required] ],
        service:  [null,  [Validators.required] ],
        status: [ true, [Validators.required]], // 1: active; 2: inactive
      }
    );

    if(this.data.news){
      this.editForm.patchValue(this.data.news);
      this.editForm.get('status')?.patchValue( data?.news?.status == 1 ? true : false);
      const createdAt = new Date(Number(this.data.news.createdAt));
      const updateAt = new Date(Number(this.data.news.createdAt));
      this.editForm.get('createdAt')?.patchValue(createdAt);
      this.editForm.get('createdBy')?.patchValue(this.data.news?.createdUser?.name);

      this.editForm.get('updatedAt')?.patchValue(updateAt);
      this.editForm.get('updatedBy')?.patchValue(this.data.news?.updatedUser?.name);
    }
    if(this.data.action === 'view'){
      this.editForm.disable();
    }

  }

  ngOnInit(): void {
  }

  save() {
    if( this.editForm.invalid ){
      this.editForm.markAllAsTouched();
      this.messageService.showMessage( 'error', 'Form thông tin không hợp lệ', 'Bạn phải điền đủ các thông tin bắt buộc' );
      return;
    }
    const formInfo = this.editForm.value;
    const payload: CreateUpdateNewsPayload = {
      title: formInfo.title,
      description: formInfo.description,
      detail: formInfo.detail,
      avatar: formInfo.avatar,
      homeAvatar: formInfo.homeAvatar,
      status: formInfo.status == true ? 1 : 0 // 1: active; 0: inactive
    }

    this.spinner.show();
    if(this.data.action == 'add' ){
      this.promotionService.createPromotion(payload).subscribe( 
        resAdd => {
          this.messageService.clearAll();
          this.messageService.showMessage( 'success', 'Thêm mới', 'Thêm mới thông tin quảng cáo thành công' );
          this.dialogRef.close({updated: true});
          this.spinner.hide();
        },
        errUpdate => {
          this.messageService.showMessage( 'error', 'Thêm mới', `Thêm mới thông tin quảng cáo không thành công.  <div> ${errUpdate?.error?.message} </div>` );
          this.spinner.hide();
        }
      )
    } else if( this.data.action == 'edit' ){
      this.promotionService.updatePromotion( this.data.news.id , payload).subscribe( 
        resUpdate => {
          this.messageService.clearAll();
          this.messageService.showMessage( 'success', 'Chỉnh sửa', 'Cập nhật thông tin quảng cáo thành công' );
          this.dialogRef.close({updated: true});
          this.spinner.hide();
        },
        errUpdate => {
          this.messageService.showMessage( 'error', 'Chỉnh sửa', `Cập nhật thông tin quảng cáo không thành công.  <div> ${errUpdate?.error?.message} </div>` );
          this.spinner.hide();
        }
      )
    }
  }


  close() {
    this.dialogRef.close();
  }


  get sellerVal(){
    return this.editForm.getRawValue();
  }


  ngOnDestroy(): void {
  }
}
