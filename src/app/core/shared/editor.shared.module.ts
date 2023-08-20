import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ValidateService } from '../services/form-validate.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidatorSharedModule } from './validator.shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// Components
import { EditorComponent } from './components/editor/editor.component';

// Services
import { UploadService } from '../services/upload.service';

@NgModule({
  declarations: [
    // Components
    EditorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule, MatIconModule,
    ValidatorSharedModule,
    CKEditorModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    // Components
    EditorComponent
  ],
  providers: [
    ValidateService,
    UploadService
  ]
})
export class EditorSharedModule { }
