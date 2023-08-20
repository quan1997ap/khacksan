// https://stackoverflow.com/questions/43779438/angular-2-form-validations-start-date-end-date
import { FormGroup } from '@angular/forms';

// export class DateValidators {
//     static rangeValidate(from: string, to: string) {
//         return (group: FormGroup): { [key: string]: any } => {
//             let f = group.controls[from];
//             let t = group.controls[to];
//             if (f && t && f.value > t.value) {
//                 return {
//                     rangeValidate: true
//                 };
//             }
//             return {};
//         }
//     }
// }

export class DateValidators {
    static rangeValidate(from: string, to: string): {[key: string]: any} | null  {
        return (group: FormGroup) => {
            let f = group.controls[from];
            let t = group.controls[to];
            if(  
                (!f.value && t.value) || (!t.value && f.value)
            ){
                return {  rangeValidate: true  };
            }
            if (f && t && f.value > t.value) {
                return {  rangeValidate: true  };
            }
            return null;
        }
    }
}