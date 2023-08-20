
// http://www.techtutorhub.com/article/Learn-how-to-show-Angular-Material-Confirm-Dialog-Box-with-Easy-Implementation/71

import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export class ActionButton {
  icon?: string;
  type: string; // 'primary', 'secondary', 'success', 'info', 'accent', 'warning' , 'danger'
  label: string;
  data?: any; // data emit when user click button
}

export class ConfirmDialogConfig {
  actionButtons?: ActionButton[];
  
  icon?: string | null | undefined = undefined ; // null | undefined is hidden
  iconColor?: string; // 'primary', 'secondary', 'success', 'info', 'accent', 'warning' , 'danger'
  isRegistryIcon?: boolean = false; // isRegistryIcon = true ?  <mat-icon >{{iconColor}}</mat-icon> : <mat-icon svgIcon="{{icon}}" class="{{iconColor + '-color' }}" ></mat-icon> 

  mainTitle?: string;
  message?: string;
  
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})

export class ConfirmDialogComponent implements OnInit {
  actions: ActionButton[] = [
    { type: 'secondary', label: 'Hủy bỏ', data: 'cancel' },
    { type: 'success', label: 'Đồng ý', data: 'danger' }
  ]
  icon: string = 'warning';
  iconColor: string = 'warning';
  isRegistryIcon = false;

  mainTitle: string = "Xác nhận";
  message: string = "Bạn có chắc chắn muốn thực hiện hành động này không?";
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
            @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogConfig
    ) {
      data?.icon && ( this.icon = data?.icon );
      data?.iconColor && ( this.iconColor = data?.iconColor );
      data?.mainTitle && ( this.mainTitle = data?.mainTitle );
      data?.message && ( this.message = data?.message );
      data?.actionButtons && ( this.actions = data?.actionButtons );
    }


  ngOnInit() {
  }

  confirm(actionEmitData: any){
    this.dialogRef.close(actionEmitData);
  }

}