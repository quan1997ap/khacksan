import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ValidateService } from '../services/form-validate.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidatorSharedModule } from './validator.shared.module';
import { NgxPopperModule } from 'ngx-popper';
// Components
import { UploadImgComponent } from './components/upload-img/upload-img.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

// Services
import { UploadService } from '../services/upload.service';


@NgModule({
  declarations: [
    // Components
    UploadImgComponent,
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule, MatIconModule,
    ValidatorSharedModule,
    NgxPopperModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    // Components
    UploadImgComponent,
    UploadFileComponent
  ],
  providers: [
    ValidateService,
    UploadService
  ]
})
export class UploadSharedModule { }
