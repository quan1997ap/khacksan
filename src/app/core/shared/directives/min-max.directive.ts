// https://stackblitz.com/edit/angular-input-min-max-directive-jhevgh?file=src%2Fapp%2Fmin-max.directive.ts
/**
   <input class="form-control" type="number" [min]="rangeConfig.min" [max]="rangeConfig.max" minMax
            [(ngModel)]="FACE_MATCH_RATE_ON_IDENTITY_DOCUMENT" style="width:80px;"/>
 */

import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[minMax]'
})
export class MinMaxDirective {

    @Input() public min: number;

    @Input() public max: number;

    /**
     * integer: 1     2      3 
     * decimal: 1.1   2.2    3.3
     */
    @Input() public numberType: 'integer' | 'decimal' = 'decimal'; 

    constructor(
        private ref: ElementRef,
        private control: NgControl
        ) { }

    @HostListener('input', ['$event'])
    public onInput(a_Event: InputEvent): void {
        const abstractControl = this.control.control;
        let val = parseFloat(this.ref.nativeElement.value);

        if (isNaN(val)) {
            this.ref.nativeElement.value = 0;
            abstractControl?.patchValue(0);
        }
        
        if(this.numberType == 'integer' ){
            this.ref.nativeElement.value = Math.floor(val);
            abstractControl?.patchValue( Math.floor(val) );
            val = parseFloat(this.ref.nativeElement.value);
        } else if( this.numberType == 'decimal' ){
            // case 0.1 => 0.9, ...
            if( !this.ref.nativeElement.value.includes('.') && a_Event.data =='.' ){
                return;
            }
        } else {
            val = parseFloat(this.ref.nativeElement.value);
        }

        if (this.max !== null && this.max !== undefined && val >= this.max) {
            this.ref.nativeElement.value = this.max;
            abstractControl?.patchValue(this.max);
        } else if (this.min !== null && this.min !== undefined && val <= this.min) {
            this.ref.nativeElement.value = this.min;
            abstractControl?.patchValue(this.min);
        }
    }

}