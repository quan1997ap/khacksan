import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { BookingPaymentComponent } from './booking-payment/booking-payment.component';
import { BookingCustomerComponent } from './booking-customer/booking-customer.component';


// Modules
import { ConfirmationSharedModule } from '../../core/shared/confirmation.shared.module';
import { ListingSharedModule } from 'src/app/core/shared/listing.shared.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormSharedModule } from '../../core/shared/form.shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { UploadSharedModule } from 'src/app/core/shared/upload.shared.module';
import { RouterModule, Routes } from '@angular/router';
import { EditorSharedModule } from 'src/app/core/shared/editor.shared.module';

// Permissions
import { NgxPermissionsGuard, NgxPermissionsModule } from 'ngx-permissions';
import { PERMISSIONS } from 'src/assets/configs/perm.config';




const routes: Routes = [
  {
    path: 'booking-customer',
    canActivate: [NgxPermissionsGuard],
    data: {
      breadcrumb: [
        { label: 'Danh sách khách đặt phòng' }
      ],
      permissions: {
        only: [PERMISSIONS['report_booking_customer:read'].code],
        redirectTo: 'error/403'
      }
    },
    component: BookingCustomerComponent
  },
  {
    path: 'booking-payment',
    canActivate: [NgxPermissionsGuard],
    data: {
      breadcrumb: [
        { label: 'Thông tin thanh toán' }
      ],
      permissions: {
        only: [PERMISSIONS['report_booking_payment:read'].code],
        redirectTo: 'error/403'
      }
    },
    component: BookingPaymentComponent
  }
];


@NgModule({
  declarations: [
    BookingPaymentComponent,
    BookingCustomerComponent
  ],
  imports: [
    CommonModule,
    ListingSharedModule,
    ConfirmationSharedModule,
    InlineSVGModule.forRoot(),
    NgxPermissionsModule.forChild(),
    RouterModule.forChild(routes),
    MatTabsModule,
    UploadSharedModule,
    FormSharedModule,
    EditorSharedModule
  ],
  providers: [
  ]
})
export class ReportModule { }
