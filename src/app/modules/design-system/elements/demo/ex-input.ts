export const ExInput = {
    html: `
    <!-- Search -->
    <form class="search-form" [formGroup]="searchForm">
      <mat-form-field class="cb-input input-with-underline" appearance="fill">
        <input matInput type="text" formControlName="textSearch" placeholder="Search">
        <mat-icon matSuffix svgIcon="cb_search"></mat-icon>
      </mat-form-field>
    </form>
    <!-- OutLine -->
    <div style="width: 300px; margin-top: 12px;">
      <input type="tel" class="form-control cb-input form-control-sm" placeholder="Phone number"/>
    </div>
    <!-- Solid -->
    <div  style="width: 300px; margin-top: 12px;">
      <input type="tel" class="form-control cb-input form-control-sm form-control-solid" placeholder="Phone number"/>
    </div>
    <!-- Number -->
    <div  style="width: 300px; margin-top: 12px;">
      <input class="form-control" type="number" [(ngModel)]="number" style="width:80px;"/>
    </div>
    <!-- Textarea -->
    <div style="width: 300px; margin-top: 12px;">
      <textarea rows="5" class="form-control cb-input form-control-sm" placeholder="Ghi chú">  </textarea> 
    </div>
    <div style="width: 300px; margin-top: 12px;">
      <textarea rows="5" class="form-control cb-input form-control-sm form-control-solid" placeholder="Ghi chú">  </textarea> 
    </div>

    `,
    css: ``,
    js: ``
}