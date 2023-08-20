import { AbstractControl } from '@angular/forms';

export class FormArrayValidators {
    static minLengthArray(min: number) {
        return (c: AbstractControl): { [key: string]: any } | null => {
            if (c.value.length >= min)
                return null;
    
            return { 'minLengthArray': { valid: false, requiredLength: min } };
        }
    }
}