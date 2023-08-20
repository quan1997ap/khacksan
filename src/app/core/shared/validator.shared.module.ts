import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Components
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';

@NgModule({
  declarations: [
    // Components
    ValidationMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    // Components
    ValidationMessageComponent
  ],
  providers: [
    
  ]
})
export class ValidatorSharedModule { }
