import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { DetailNewsComponent } from './detail-news/detail-news.component';
import { ListNewesComponent } from './list-newes/list-newes.component';

// Modules
import { ConfirmationSharedModule } from '../../core/shared/confirmation.shared.module';
import { ListingSharedModule } from 'src/app/core/shared/listing.shared.module';
import { ReactiveFormsModule } from '@angular/forms';
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
    path: '',
    canActivate: [NgxPermissionsGuard],
    data: {
      breadcrumb: [
        { label: 'Danh sách tin tức' }
      ],
      permissions: {
        only: [PERMISSIONS['news:read'].code],
        redirectTo: 'error/403'
      }
    },
    component: ListNewesComponent
  }
];


@NgModule({
  declarations: [
    ListNewesComponent,
    DetailNewsComponent,
  ],
  imports: [
    CommonModule,
    ListingSharedModule,
    ConfirmationSharedModule,
    ReactiveFormsModule,
    InlineSVGModule.forRoot(),
    NgxPermissionsModule.forChild(),
    RouterModule.forChild(routes),
    MatTabsModule,
    UploadSharedModule,
    FormSharedModule,
    EditorSharedModule
  ],
  entryComponents: [
    DetailNewsComponent
  ],
  providers: [
  ]
})
export class NewsModule { }
