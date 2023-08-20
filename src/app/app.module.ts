import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Custom Module
import { RegistryIconModule } from './core/shared/registry-icon.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { OWL_DATE_TIME_LOCALE  } from '@danielmoncada/angular-datetime-picker';
// Interceptor
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { RequestInterceptor } from './core/interceptor/request.interceptor';

// Sidebar
import { SidebarService } from './core/services/sidebar.service';

// Currentcy Pipe => set default VN
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import localeViExtra from '@angular/common/locales/extra/vi';
registerLocaleData(localeVi, DEFAULT_LOCALE , localeViExtra);

import {LOCALE_ID} from '@angular/core';
import { DEFAULT_LOCALE, REQUEST_TIMEOUT } from 'src/assets/configs/app.config';
import { DEFAULT_TIMEOUT, TimeoutInterceptor } from './core/interceptor/timeout.interceptor';

// Import your library
import { NgxPermissionsModule } from 'ngx-permissions';
import { AppInitService } from './core/services/app-init.service';

export function initApp(initService: AppInitService) {
  return () => initService.init();
}


@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    RegistryIconModule,
    ToastrModule.forRoot({
      enableHtml: true,
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true
    }),
    NgxSpinnerModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    SidebarService, AppInitService,
    // use french locale 'vi-VN', "en-US"
    { provide: OWL_DATE_TIME_LOCALE, useValue: DEFAULT_LOCALE },
    // setup request/error interceptor
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // setup timeout request
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    { provide: DEFAULT_TIMEOUT, useValue: REQUEST_TIMEOUT },
    // setup currency pipes https://stackoverflow.com/questions/39634025/how-to-display-the-currency-symbol-to-the-right-in-angular
    { provide: LOCALE_ID,  useValue: DEFAULT_LOCALE  },
    { provide: APP_INITIALIZER, useFactory: initApp , deps: [AppInitService], multi: true,  }

  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(){}

}
