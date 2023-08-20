// https://stackoverflow.com/questions/43779438/angular-2-form-validations-start-date-end-date
import { FormGroup } from '@angular/forms';

export class TransactionLimitsValidators {
    // Hạn mức tối thiểu / giao dịch  < Hạn mức tối đa / giao dịch
    static minmaxAmountValidate() : { [key: string]: any } | null {
        return (group: FormGroup) => {
            let min = group.controls['minAmount'];
            let max = group.controls['maxAmount'];
            if(Number(max.value) == 0){
                return { maxAmountEqualZero: true };
            }  else if (min.value && max.value && Number(min.value) > Number(max.value)) {
                return { minmaxAmount: true };
            }
            return  null;
        }
    }

    // Số tiền tối đa trong ngày < Số tiền tối đa trong tháng
    static maxAmountPerDayAndPerMonthValidate() : { [key: string]: any } | null {
        return (group: FormGroup) => {
            let maxDay = group.controls['maxAmountPerDay'];
            let maxMonth = group.controls['maxAmountPerMonth'];
            if(Number(maxMonth.value) == 0){
                return { maxMonthEqualZero: true };
            } else if (maxDay.value && maxMonth.value && Number(maxDay.value) > Number(maxMonth.value)) {
                return {   maxAmountPerDayAndPerMonth: true  };
            }
            return  null;
        }
    }

    // Hạn mức tối đa / giao dịch < Số tiền tối đa trong ngày
    static maxAmountPerDayValidateWithTransactionLimit(): { [key: string]: any } | null  {
        return (group: FormGroup) => {
            let minAmount = group.controls['minAmount']; // TransactionLimit
            let maxAmount = group.controls['maxAmount']; // TransactionLimit
            let maxAmountPerDay = group.controls['maxAmountPerDay'];
            if (maxAmount.value && maxAmountPerDay.value && Number(maxAmount.value) > Number(maxAmountPerDay.value)) {
                return {   maxTransactionAndMaxPerDay: true  };
            }
            return null;
        }
    }

}