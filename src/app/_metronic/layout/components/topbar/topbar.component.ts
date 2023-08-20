import { Subject } from 'rxjs';
import { AutoLogoutService } from './../../../../core/services/auto-logout.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit , OnDestroy {
  private destroy$ = new Subject(); 

  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';

  // Setting 
  hasCamera: boolean;
  hasMicro: boolean;
  devicePermChecked: boolean;
  mqtttConnected: boolean;
  sip: any;
  @Input() currentRouter: string;
  queuePause: boolean;
  checkInterval: any;


  constructor(
    private layout: LayoutService,
    private autoLogoutService: AutoLogoutService
  ) {
    this.autoLogoutService.init();
  }

  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
  }

}
