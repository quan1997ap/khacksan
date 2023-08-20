import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class DownloadFileNameConfig {
  fileName: string;
  actions?: {
    type: string;
    label:string;
    data:string;
  }[]
}

@Component({
  selector: 'app-download-file-name',
  templateUrl: './download-file-name.component.html',
  styleUrls: ['./download-file-name.component.scss']
})
export class DownloadFileNameComponent implements OnInit {
  actions = [
    { type: 'secondary', label: 'Hủy bỏ', data: 'cancel' },
    { type: 'success', label: 'Đồng ý', data: 'accept' }
  ]
  fileName: string = 'warning';
  constructor(
    public dialogRef: MatDialogRef<DownloadFileNameComponent>,
            @Inject(MAT_DIALOG_DATA) public data: DownloadFileNameConfig
    ) {
      data?.fileName && ( this.fileName = data?.fileName );
      data?.actions && ( this.actions = data?.actions );
    }


  ngOnInit() {
  }

  confirm(action: any){
    this.dialogRef.close(
      { action: action,
        fileName: this.fileName
      });
  }

}