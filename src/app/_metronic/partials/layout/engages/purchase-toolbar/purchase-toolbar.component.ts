import { apptheme } from './../../../../../../environments/config';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-purchase-toolbar',
  templateUrl: './purchase-toolbar.component.html',
})
export class PurchaseToolbarComponent implements OnInit {
  appPurchaseUrl: string = apptheme.appPurchaseUrl;

  constructor() {
  }

  ngOnInit(): void {
  }
}
