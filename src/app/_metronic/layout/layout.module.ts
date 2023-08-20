import { FormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RouterModule, Routes } from '@angular/router';
import { NgbDropdownModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationModule } from '../../modules/i18n';
import { LayoutComponent } from './layout.component';
import { ExtrasModule } from '../partials/layout/extras/extras.module';
import { Routing } from '../../pages/routing';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScriptsInitComponent } from './components/scripts-init/scripts-init.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AsideMenuComponent } from './components/aside/aside-menu/aside-menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { PageTitleComponent } from './components/header/page-title/page-title.component';
import { HeaderMenuComponent } from './components/header/header-menu/header-menu.component';
import {
  DrawersModule,
  DropdownMenusModule,
  ModalsModule,
  EngagesModule,
} from '../partials';
import { EngagesComponent } from '../partials/layout/engages/engages.component';
import { BreadcrumbsModule } from './../../core/shared/breadcrumbs.shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PermResolver } from 'src/app/core/resolvers/perm.resolver';
import { AppConfigResolver } from 'src/app/core/resolvers/app-config.resolver';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    resolve: {
      perm: PermResolver,
      appConfig: AppConfigResolver
    },
    children: Routing,
  },
];

@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ScriptsInitComponent,
    ToolbarComponent,
    AsideMenuComponent,
    PageTitleComponent,
    HeaderMenuComponent,
    EngagesComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslationModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    ExtrasModule,
    ModalsModule,
    DrawersModule,
    EngagesModule,
    DropdownMenusModule,
    TranslateModule,
    BreadcrumbsModule,
    NgxPermissionsModule.forChild(),
    MatMenuModule,
    MatTooltipModule,
    FormsModule,
  ],
  exports: [RouterModule],
  providers: [PermResolver, AppConfigResolver],
})
export class LayoutModule {}
