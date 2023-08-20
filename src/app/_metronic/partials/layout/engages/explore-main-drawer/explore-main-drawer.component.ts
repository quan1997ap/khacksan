import {Component, OnInit} from '@angular/core';
import { apptheme } from 'src/environments/config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-explore-main-drawer',
  templateUrl: './explore-main-drawer.component.html',
})
export class ExploreMainDrawerComponent implements OnInit {
  appThemeName: string = environment.appThemeName;
  appPurchaseUrl: string = apptheme.appPurchaseUrl;
  appPreviewUrl: string = apptheme.appPreviewUrl;
  themes = environment.theme;

  constructor() {
  }

  ngOnInit(): void {
  }
}
