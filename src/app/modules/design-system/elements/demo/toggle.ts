export const ExToggle = {
    html: `
    <form class="row" [formGroup]="toggleForm">
    <div class="col-xl-3">
        <div class="fs-6 fw-bold mt-2 mb-3">Toggle Input</div>
    </div>
    <div class="col-xl-9">
        <div class="form-check form-switch form-check-custom form-check-solid">
            <input class="form-check-input" type="checkbox" formControlName="checked" >
            <label class="form-check-label fw-bold text-gray-400 ms-3" for="status">Active</label>
        </div>
    </div>
  </form>

  <form class="row" [formGroup]="toggleForm">
    <div class="col-xl-3">
        <div class="fs-6 fw-bold mt-2 mb-3">Toggle disabled</div>
    </div>
    <div class="col-xl-9">
        <div class="form-check form-switch form-check-custom form-check-solid">
            <input class="form-check-input" type="checkbox"  checked="checked" disabled >
            <label class="form-check-label fw-bold text-gray-400 ms-3" for="status">Active</label>
        </div>
    </div>
  </form>

  <div class="row">
    <div class="col-xl-3">
        <div class="fs-6 fw-bold mt-2 mb-3">Toggle Input sm</div>
    </div>
    <div class="col-xl-9">
      <label class="form-check form-switch form-check-custom form-check-solid">
        <input class="form-check-input w-30px h-20px" type="checkbox" value="1" checked="checked" name="notifications">
        <span class="form-check-label text-muted fs-6">Recuring</span>
      </label>
    </div>
  </div>

  <form class="row" [formGroup]="toggleForm">
    <div class="col-xl-3">
        <div class="fs-6 fw-bold mt-2 mb-3">Mat Toggle </div>
    </div>
    <div class="col-xl-9">
        <div class="form-check form-switch form-check-custom form-check-solid">
          <mat-slide-toggle disableRipple="true">Slide me!</mat-slide-toggle>
        </div>
    </div>
  </form>

  <form class="row" [formGroup]="toggleForm">
    <div class="col-xl-3">
        <div class="fs-6 fw-bold mt-2 mb-3">Mat Toggle </div>
    </div>
    <div class="col-xl-9">
        <div class="form-check form-switch form-check-custom form-check-solid">
          <mat-slide-toggle disableRipple="true" disabled="true">Slide me!</mat-slide-toggle>
        </div>
    </div>
  </form>


  <form class="row" [formGroup]="toggleForm">
    <div class="col-xl-3">
        <div class="fs-6 fw-bold mt-2 mb-3">Mat Toggle</div>
    </div>
    <div class="col-xl-9">
        <div class="form-check form-switch form-check-custom form-check-solid">
          <mat-slide-toggle class="sm" disableRipple="true">Slide me!</mat-slide-toggle>
        </div>
    </div>
  </form>
    `,
    css: ``,
    js: ``
}