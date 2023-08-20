// https://stackoverflow.com/questions/43779438/angular-2-form-validations-start-date-end-date
import { FormGroup } from '@angular/forms';

export class SameNullOrNotNull {
    static validate(controlName1: string, controlName2: string): {[key: string]: any} | null  {
        return (group: FormGroup) => {
            let control1 = group.controls[controlName1];
            let control2 = group.controls[controlName2];
            if(  
                (!control1.value && control2.value) || (!control2.value && control1.value)
            ){
                return {  
                    notSameNullOrNotNull: true, //  'Điền giá trị hoặc bỏ trống cho cả 2 input'
                };
            }
            return null;
        }
    }
}