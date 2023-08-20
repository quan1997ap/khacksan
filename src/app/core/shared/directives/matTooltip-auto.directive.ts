// https://stackoverflow.com/questions/66127028/angular-material-mattooltip-show-up-only-when-the-element-is-truncated

import { Directive, ElementRef, HostListener } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
@Directive({
    selector: '[matTooltipAuto]',
})
export class MatTooltipAutoDirective {

    constructor(
        public el: ElementRef,
        private matTooltip: MatTooltip
    ) { }

    @HostListener('mouseenter', ['$event']) onEnter($event: any): void {
        //  overflow only 1 lone
        const scrollWidth = this.el.nativeElement.scrollWidth;
        const clientWidth = this.el.nativeElement.clientWidth;

        // overflow > 1line ( when using webkit-line-clamp )
        const scrollHeight = this.el.nativeElement.scrollHeight;
        const clientHeight = this.el.nativeElement.clientHeight;

        if (scrollWidth > clientWidth || scrollHeight > clientHeight) {
            this.matTooltip.showDelay = 200;
            this.matTooltip.disabled = false;
        } else {
            this.matTooltip.disabled = true;
        }
    }
}