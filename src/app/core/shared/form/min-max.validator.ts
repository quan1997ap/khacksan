// using for input text => format number
import { FormGroup } from '@angular/forms';

export class MinMaxValidators {
    static minNumberString(controlName: string, min: number) : {[key: string]: any} | null  {
        return (group: FormGroup) => {
            let control = group.controls[controlName];
            if (Number(control.value) < min ) {
                return {
                    minNumberString: true
                };
            }
            return null;
        }
    }

    static maxNumberString(controlName: string, max: number) : {[key: string]: any} | null  {
        return (group: FormGroup) => {
            let control = group.controls[controlName];
            if (Number(control.value) < max ) {
                return {
                    maxNumberString: true
                };
            }
            return null;
        }
    }
}