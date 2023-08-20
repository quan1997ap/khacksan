export const ExSlider = {
    html: `
    <div class="full-width mat-slider-container" style="width: 300px;" 
        [ngClass]="rangeValue < 20 ? 'red' : rangeValue < 50 ? 'orange' : 'green' ">
        <mat-slider [min]="rangeConfig.min" [max]="rangeConfig.max" step="1" [(ngModel)]="rangeValue"></mat-slider>
    </div>
    `,
    css: ``,
    js: ``
}