import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ListPromotionsComponent } from './list-promotions/list-promotions.component';
import { DetailPromotionComponent } from './detail-promotion/detail-promotion.component';

// Modules
import { ConfirmationSharedModule } from '../../core/shared/confirmation.shared.module';
import { ListingSharedModule } from 'src/app/core/shared/listing.shared.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormSharedModule } from '../../core/shared/form.shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { UploadSharedModule } from 'src/app/core/shared/upload.shared.module';
import { RouterModule, Routes } from '@angular/router';
import { EditorSharedModule } from 'src/app/core/shared/editor.shared.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { NgxMultipleDatesModule } from 'ngx-multiple-dates'; 

// Permissions
import { NgxPermissionsGuard, NgxPermissionsModule } from 'ngx-permissions';
import { PERMISSIONS } from 'src/assets/configs/perm.config';



const routes: Routes = [
  {
    path: '',
    canActivate: [NgxPermissionsGuard],
    data: {
      breadcrumb: [
        { label: 'Danh sách khuyến mãi' }
      ],
      permissions: {
        only: [PERMISSIONS['promotion:read'].code],
        redirectTo: 'error/403'
      }
    },
    component: ListPromotionsComponent
  }
];


@NgModule({
  declarations: [
    ListPromotionsComponent,
    DetailPromotionComponent
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
    EditorSharedModule,
    MatNativeDateModule,
    // Multi date picker
    MatDatepickerModule,
    MatIconModule,
    NgxMultipleDatesModule 
  ],
  providers: [
  ]
})
export class PromotionModule { }
