import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment';
import { apptheme } from './../../../../../../environments/config';
@Component({
  selector: 'app-help-drawer',
  templateUrl: './help-drawer.component.html',
})
export class HelpDrawerComponent implements OnInit {
  appThemeName: string = environment.appThemeName;
  appPurchaseUrl: string = apptheme.appPurchaseUrl;

  constructor() {
  }

  ngOnInit(): void {
  }
}
