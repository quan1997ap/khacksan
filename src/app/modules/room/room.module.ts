import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ListRoomsComponent } from './list-rooms/list-rooms.component';
import { DetailRoomComponent } from './detail-room/detail-room.component';

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
    path: '',
    canActivate: [NgxPermissionsGuard],
    data: {
      breadcrumb: [
        { label: 'Danh sách loại phòng' }
      ],
      permissions: {
        only: [PERMISSIONS['room:read'].code],
        redirectTo: 'error/403'
      }
    },
    component: ListRoomsComponent
  }
];


@NgModule({
  declarations: [
    DetailRoomComponent,
    ListRoomsComponent,
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
  entryComponents: [
    DetailRoomComponent
  ],
  providers: [
  ]
})
export class RoomModule { }
