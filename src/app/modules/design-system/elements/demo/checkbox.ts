export const ExCheckbox = {
    html: `

    <mat-checkbox class="example-margin" [disabled]="true">Disabled</mat-checkbox>
    
    <mat-checkbox class="example-margin" [disabled]="true"  [checked]="true" >Disabled-checked</mat-checkbox> 

    <mat-checkbox class="example-margin" [disabled]="false"  [checked]="true" >Enable-checked</mat-checkbox>

    <mat-checkbox class="example-margin" [disabled]="false"  [checked]="false" >Enable</mat-checkbox>


    <div class="row mb-8">
        <div class="col-xl-3">
            <div class="fs-6 fw-bold mt-2 mb-3">Checkbox</div>
        </div>
        <div class="col-xl-9">
            <div class="d-flex fw-bold h-100">
                <div class="form-check form-check-custom form-check-solid me-9">
                    <input class="form-check-input" type="checkbox" value="" id="email">
                    <label class="form-check-label ms-3" for="email">Email</label>
                </div>
                <div class="form-check form-check-custom form-check-solid">
                    <input class="form-check-input" type="checkbox" value="" id="phone" checked="checked">
                    <label class="form-check-label ms-3" for="phone">Phone</label>
                </div>
            </div>
        </div>
    </div>
    `,
    css: ``,
    js: ``
}