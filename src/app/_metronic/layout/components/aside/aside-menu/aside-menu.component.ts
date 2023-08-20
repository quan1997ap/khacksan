import { filter, map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { apptheme } from 'src/environments/config';
import { environment } from '../../../../../../environments/environment';

import { ASIDE_MENU } from './menu';
@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  // templateUrl: './aside-menu.component.bk.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = apptheme.appPreviewChangelogUrl;
  menuConfigs = ASIDE_MENU;
  currentRoute: string;
  constructor(
    private router: Router
  ) {
    this.currentRoute = router.url
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects
      }
    });
  }

  isLinkActive(url: any): boolean{
    return !!this.currentRoute && this.currentRoute.includes(url);
  }
  
  ngOnInit(): void {}
}
