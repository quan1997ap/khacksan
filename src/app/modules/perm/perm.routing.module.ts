import { PERMISSIONS } from '../../../assets/configs/perm.config';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { PermissionsGroupComponent } from './permissions-group/permissions-group.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGroupEditComponent } from './permissions-group/permissions-group-edit/permissions-group-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo :  'permissions-group',
  },
  {
    path: 'permissions-group',
    children: [
      {
        path: '',
        canActivate: [NgxPermissionsGuard],
        data: {
          breadcrumb: [
            { label: 'Quản lý nhóm quyền' }
          ],
          permissions: {
            only: [ PERMISSIONS['perm_group:read'].code],
            redirectTo: 'error/403'
          }
        },
        component: PermissionsGroupComponent
      },
      {
        path: 'add',
        canActivate: [NgxPermissionsGuard],
        data: {
          breadcrumb: [
            { label: 'Thêm nhóm quyền' }
          ],
          permissions: {
            only: [ PERMISSIONS['perm_group:read'].code],
            redirectTo: 'error/403'
          }
        },
        component: PermissionsGroupEditComponent
      },
      {
        path: 'detail/:id/:action',
        canActivate: [NgxPermissionsGuard],
        data: {
          breadcrumb: [
            { label: 'Chỉnh sửa nhóm quyền' }
          ],
          permissions: {
            only: [ PERMISSIONS['perm_group:read'].code],
            redirectTo: 'error/403'
          }
        },
        component: PermissionsGroupEditComponent
      },
    ],
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermRoutingModule { }