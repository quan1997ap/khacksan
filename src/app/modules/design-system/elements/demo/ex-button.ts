export const  ExButton = {
    htmlDefault: `
    <h1><br>Buttton Default </h1>
    <div style="margin-top: 12px;">
      <button type="button" class="btn btn-secondary"> <i class="socicon-foursquare"></i> secondary </button>
      <button type="button" class="btn btn-success">Success</button>
      <button type="button" class="btn btn-danger">Danger</button>
      <button type="button" class="btn btn-warning">Warning</button>
      <button type="button" class="btn btn-info">Info</button>
      <button type="button" class="btn btn-light">Light</button>
      <button type="button" class="btn btn-dark">Dark</button>
      <button type="button" class="btn btn-link">Link</button>
    </div>
  
    <div style="margin-top: 12px;">
      <button type="button" class="btn btn-secondary btn-sm"> <i class="socicon-foursquare"></i> secondary </button>
      <button type="button" class="btn btn-success btn-sm">Success</button>
      <button type="button" class="btn btn-danger btn-sm">Danger</button>
      <button type="button" class="btn btn-warning btn-sm">Warning</button>
      <button type="button" class="btn btn-info btn-sm">Info</button>
      <button type="button" class="btn btn-light btn-sm">Light</button>
      <button type="button" class="btn btn-dark btn-sm">Dark</button>
      <button type="button" class="btn btn-link btn-sm">Link</button>
    </div>
    `,
    actionBtn : `
    <div style="display: flex;">
      <!-- Edit -->
      <button type="button" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" [matTooltipPosition]="'below'"  [matTooltipShowDelay]="200" matTooltip="Sửa">
        <span class="svg-icon svg-icon-3"  [inlineSVG]="'./assets/media/icons/duotune/art/art005.svg'">
        </span>
      </button>
      <!-- Edit -->
      <button type="button" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" [matTooltipPosition]="'below'" [matTooltipShowDelay]="200" matTooltip="Chi tiết">
          <span class="svg-icon svg-icon-3" [inlineSVG]="'./assets/media/registry-svg-icon/view.svg'">
          </span>
      </button>
      <!-- Xóa -->
      <button type="button" class="btn danger-btn btn-icon btn-bg-light btn-active-color-primary btn-sm" [matTooltipPosition]="'below'" [matTooltipShowDelay]="200" matTooltip="Xóa">
        <span class="svg-icon svg-icon-3"  [inlineSVG]="'./assets/media/icons/duotune/general/gen027.svg'">
        </span>
      </button>
    </div>
    `,
    htmlCustom : `
    <h1><br>Buttton Custom </h1>
    <button class="cbbank-btn primary" mat-button>
      <mat-icon>home</mat-icon> Primary
    </button>
    <button class="cbbank-btn secondary" mat-button>secondary</button>
    <button class="cbbank-btn success" mat-button>success</button>
    <button class="cbbank-btn info" mat-button>info</button>
    <button class="cbbank-btn accent" mat-button>Accent</button>
    <button class="cbbank-btn warning" mat-button>warning</button>
    <button class="cbbank-btn danger" mat-button disabled>danger</button>
    <button disabled class="cbbank-btn only-icon warning">
      <mat-icon>home</mat-icon>
    </button>
    <button class="cbbank-btn primary only-icon" mat-button>
      <mat-icon svgIcon="cb_filter"></mat-icon>
    </button>
    `,
    css: ``,
    js: ``
}