import { MessageService } from './../../../services/message.service';
import { Component, Input, OnInit, Injector, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from "@angular/core";
/**
 * Custom component as form control
 * https://blog.angular-university.io/angular-custom-form-controls/ 
 * 
 *  */
import { API_URL } from './../../../../../assets/configs/app.config';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, AbstractControl, ValidationErrors, ControlValueAccessor, Validator, NgControl, FormControl } from '@angular/forms';
import { UploadService } from 'src/app/core/services/upload.service';
import { SystemSettingService } from 'src/app/core/services/system-setting.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: UploadImgComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: UploadImgComponent
    }
  ]
})
export class UploadImgComponent implements OnInit, ControlValueAccessor, Validator, AfterViewInit {

  files?: FileList; progressInfos: any[] = [];
  @Input() title = ''; 
  @Input() requiredTitle = true; 
  fileUrl: string | null;
  onChange = (fileUrl: string | null) => { };
  onTouched = () => { };
  touched = false;
  disabled = false;
  ngControl: NgControl; formControl: AbstractControl = new FormControl(null);
  previews: any;
  acceptFileType: string;
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  constructor(
    private messageService: MessageService,
    private uploadService: UploadService,
    private inj: Injector,
    private readonly cdr: ChangeDetectorRef,
    private systemSettingService: SystemSettingService
  ) {
    this.acceptFileType = this.systemSettingService.getSetting()?.uploadFileTypes.join(', ');  
  }


  ngOnInit(): void { }
  ngAfterViewInit() {
    this.ngControl = this.inj.get(NgControl);
    if( this.ngControl && this.ngControl.control ){
      this.formControl = this.ngControl.control;
      this.cdr.detectChanges();
    }
  }

  selectFiles(event: any): void {
    this.progressInfos = [];
    this.files = event.target.files;
    if (this.files && this.files[0]) {
      const numberOfFiles = this.files.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews = reader.result;
        };
        reader.readAsDataURL(this.files[i]);
      }
    }
    this.markAsTouched();
    this.uploadFiles(this.fileInput.nativeElement);
  }

  clearInput(fileInput: any) {
    fileInput.value = null;
    this.progressInfos.length = 0;
    this.files = undefined;
    this.previews = null;
    this.markAsTouched();
  }


  // https://stackblitz.com/edit/angular-12-multiple-image-upload-preview?file=src%2Fapp%2Fcomponents%2Fupload-images%2Fupload-images.component.ts,src%2Fapp%2Fservices%2Ffile-upload.service.ts,src%2Fapp%2Fcomponents%2Fupload-images%2Fupload-images.component.html
  uploadFiles(fileInput: any): void {
    if (this.files?.length) {
      for (let i = 0; i < this.files.length; i++) {
        this.uploadFile(i, this.files[i], fileInput);
      }
    }
  }

  uploadFile(idx: number, file: File, fileInput: any): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    this.uploadService.uploadImage(file).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progressInfos[idx].value = Math.round( (100 * event.loaded) / event.total );
      } else if (event instanceof HttpResponse) {
        if(event.body){
          this.onChange(event.body.data.fileUrl);
          this.fileUrl = event.body.data.fileUrl;
        }
        this.messageService.showMessage( 'success', 'Upload', 'Upload thành công' );
        this.progressInfos[idx] = null;
        this.clearInput(fileInput);
      }
    },
    (err: any) => {
      this.progressInfos[idx] = null;
      const errMess = err.error.error ? `${err.error.error} : ${err.error.message}` : 'Upload không thành công. Có lỗi xảy ra';
      this.messageService.showMessage( 'error', 'Upload', errMess );
    })

  }

  removeImage() {
    this.onChange(null);
    this.fileUrl = null;
    this.previews = null;
  }

  /**
   * Custom control : writeValue, registerOnChange, registerOnTouched, setDisabledState
   */

  writeValue(fileUrl: string) {
    this.fileUrl = fileUrl;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

}
