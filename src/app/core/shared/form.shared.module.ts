import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ValidateService } from './../services/form-validate.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
// https://vlio20.github.io/angular-datepicker/daytimePicker
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
// Directives
import { DelayedInputDirective } from './directives/delayed-input.directive';
// Components
import { ValidatorSharedModule } from './validator.shared.module';

@NgModule({
  declarations: [
    // Directives
    DelayedInputDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    MatTooltipModule, MatIconModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    // Directives
    DelayedInputDirective,
    MatTooltipModule,
    // Components
    ValidatorSharedModule,
    NgxMaskModule,
  ],
  providers: [
    ValidateService
  ]
})
export class FormSharedModule { }
