import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ListSystemSettingsComponent } from './system-setting/list-system-settings/list-system-settings.component';
import { DetailSystemSettingComponent } from './system-setting/detail-system-setting/detail-system-setting.component';

// Shared
import { ConfirmationSharedModule } from './../../core/shared/confirmation.shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { ListingSharedModule } from './../../core/shared/listing.shared.module';
import { FormSharedModule } from 'src/app/core/shared/form.shared.module';

// Permission
import { NgxPermissionsGuard, NgxPermissionsModule } from 'ngx-permissions';
import { PERMISSIONS } from 'src/assets/configs/perm.config';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'common-configs',
    pathMatch: 'full'
  },
  {
    path: 'common-configs',
    component: ListSystemSettingsComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [PERMISSIONS['system_settings:read'].code],
        redirectTo: 'error/403'
      }
    }
  }
];

@NgModule({
  declarations: [
    ListSystemSettingsComponent,
    DetailSystemSettingComponent
  ],
  imports: [
    CommonModule,
    ConfirmationSharedModule,
    ReactiveFormsModule,
    InlineSVGModule.forRoot(),
    NgxPermissionsModule.forChild(),
    FormsModule,
    MatSliderModule,
    ListingSharedModule,
    RouterModule.forChild(routes),
    FormSharedModule
  ],
  entryComponents: [
    DetailSystemSettingComponent
  ],
  providers: [
  ]
})
export class SystemParameterModule { }

