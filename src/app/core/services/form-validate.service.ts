import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class ValidateService {
	public enPattern =  /^[A-Za-z0-9 ]+$/;
	public viPattern = /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/;
	public pwdPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$/;
	public mobnumPattern = /^((\\+91-?)|0)?[0-9]{10}$/; 

	constructor() {
	}


	/**
	 * Use https://www.freecodecamp.org/news/how-to-validate-angular-reactive-forms/
	 *  Chú ý 2 cách sử dụng custom validator
	 *  username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
        password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],

	 */
	patternViNameValidator(): ValidatorFn | null {
		return (control: AbstractControl): { [key: string]: any } | null => {
		  if (!control.value) {
			return null;
		  }
		  const valid = this.viPattern.test(control.value);
		  return valid ? null : { invalidPatternName: true };
		};
	}

	patternEnNameValidator(): ValidatorFn | null {
		return (control: AbstractControl): { [key: string]: any } | null => {
		  if (!control.value) {
			return null;
		  }
		  const valid = this.enPattern.test(control.value);
		  return valid ? null : { invalidPatternName: true };
		};
	}


	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
    isControlHasError(form: FormGroup, controlName: string, validationType: string): boolean {
		let control;
		
		if(controlName.includes('.')){
			// nested key => support 2 level
			const controlNames = controlName.split('.');
			if(controlNames.length == 2){
				const key1 = controlNames[0];
				const key2 = controlNames[1];
				const prControl =  form['controls'][key1] as FormGroup;
				control = prControl['controls'][key2];
			}
		} else {
			control = form.controls[controlName];
		}

		if (!control) {
			return false;
		}

		const result =	control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

}
