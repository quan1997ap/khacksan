import { Input } from '@angular/core';
// https://stackoverflow.com/questions/40680321/get-all-validation-errors-from-angular-2-formgroup
// https://stackblitz.com/edit/angular-fycpht?file=src%2Fapp%2Fapp.component.html
import { Component, OnInit } from '@angular/core';
import { NgControl, FormControl, AbstractControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'validation-message',
  templateUrl: './validation-message.component.html'
})


export class ValidationMessageComponent implements OnInit {
  @Input() control: AbstractControl | null;
  @Input() controlName: string;
  @Input() requireMessage: string;
  constructor(
  ) { }

  ngOnInit() {
  }

  getError(){
    if (this.control && this.control.invalid && ( this.control.dirty || this.control.touched )) {
      const error = this.control.errors;
      if (error) {
        let text;
        const errorType = Object.keys(error)[0];
        switch (errorType) {
          case 'required': text = this.requireMessage ? this.requireMessage : `Vui lòng điền trường này`; break;
          case 'pattern': text = `${this.controlName} không đúng định dạng!`; break;
          case 'email': text = `Email không hợp lệ!`; break;
          case 'minlength': text = `${this.controlName} quá ngắn ( Tối thiểu: ${error[errorType]?.requiredLength} kí tự )`; break;
          case 'maxlength': text = `${this.controlName} quá dài ( Tối đa: ${error[errorType]?.requiredLength} kí tự )`; break;
          case 'areEqual': text = `${this.controlName} không bằng nhau!`; break;
          case 'minLengthArray': text = `Thêm tối thiểu ${error[errorType]?.requiredLength} ${this.controlName} `; break;
          default: text = `${this.controlName} : ${error.errorType}`;
        }
        return text;
      }
      return;
    } else {
      return;
    }
  }
}
