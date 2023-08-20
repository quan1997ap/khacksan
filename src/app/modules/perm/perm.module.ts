import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermRoutingModule } from './perm.routing.module';

// Components
import { PermissionsGroupComponent } from './permissions-group/permissions-group.component';
import { PermissionsGroupEditComponent } from './permissions-group/permissions-group-edit/permissions-group-edit.component';
import { PermissionsGroupEditFormComponent } from './permissions-group/permissions-group-edit/permissions-group-edit-form/permissions-group-edit-form.component';
import { PermissionsGroupEditPermsComponent } from './permissions-group/permissions-group-edit/permissions-group-edit-perms/permissions-group-edit-perms.component';

// Shared
import { ConfirmationSharedModule } from './../../core/shared/confirmation.shared.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ListingSharedModule } from './../../core/shared/listing.shared.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { ValidatorSharedModule } from 'src/app/core/shared/validator.shared.module';

// Pipes + Directive
import { FilterPermsPipe } from 'src/app/core/shared/pipes/filter-perms.pipe';
import { FilterResourcesPipe } from 'src/app/core/shared/pipes/filter-resourcess.pipe';

// Permission
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormSharedModule } from 'src/app/core/shared/form.shared.module';


@NgModule({
  declarations: [
    PermissionsGroupComponent,
    PermissionsGroupEditComponent,
    FilterPermsPipe,
    FilterResourcesPipe,
    PermissionsGroupEditFormComponent,
    PermissionsGroupEditPermsComponent
  ],
  imports: [
    CommonModule,
    PermRoutingModule,
    ConfirmationSharedModule,
    InlineSVGModule.forRoot(),
    NgxTrimDirectiveModule,
    // share module
    ListingSharedModule,
    NgxPermissionsModule.forChild(),
    ValidatorSharedModule,
    FormSharedModule
  ],
  entryComponents: [
    PermissionsGroupEditComponent
  ],
  providers: [
  ]
})
export class PermissionModule {}

