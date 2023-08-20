export const ExDatePicker = {
    import: `
    import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';


    OwlDateTimeModule, OwlNativeDateTimeModule 
    `,
    default: {
        html: `
        <!-- Solid Input-->
        <div class="owl-date-wrap" style="width: 300px; margin-bottom: 12px;" >
            <input [owlDateTime]="dt1" [owlDateTimeTrigger]="dt1" placeholder="Date Time"  [(ngModel)]="dates[0].time" 
             class="form-control cb-input form-control-sm  form-control-solid ">
            <mat-icon matPrefix svgIcon="cb_date" color="picker-icon"></mat-icon>
            <owl-date-time #dt1 [pickerType]="'calendar'"></owl-date-time>
        </div>
        <!-- Input with border -->
        <div class="owl-date-wrap" style="width: 300px; margin-bottom: 12px;" >
            <input [owlDateTime]="dt2" [owlDateTimeTrigger]="dt2" placeholder="Date Time"  [(ngModel)]="dates[1].time"  
            class="form-control cb-input form-control-sm ">
            <mat-icon matPrefix svgIcon="cb_date" color="picker-icon"></mat-icon>
            <owl-date-time #dt2></owl-date-time>
        </div>
        `,
        ts: `
        dates = [
            { time: new Date()},
            { time: new Date()},
           ]         
        `
    },
    ngFor: {
        html: `
        <div *ngFor="let date of dates; let i = index;"  class="owl-date-wrap" style="width: 300px; margin-bottom: 12px;" >
            <input [owlDateTime]="ngForDate_i" [owlDateTimeTrigger]="ngForDate_i" placeholder="Date Time"  
            [(ngModel)]="date.time"  class="form-control cb-input form-control-sm ">
            <mat-icon matPrefix svgIcon="cb_date" color="picker-icon"></mat-icon>
            <owl-date-time #ngForDate_i></owl-date-time>
        </div>
        <br>
        {{dates | json}}
        `,
        ts: `
        dates = [
            { time: new Date()},
            { time: new Date()},
           ]         
        `
    }
}