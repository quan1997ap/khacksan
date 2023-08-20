import { SidebarService } from './../../../services/sidebar.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { SystemSettingService } from 'src/app/core/services/system-setting.service';
import { ITEMS_PER_PAGE } from 'src/assets/configs/app.config';
import { IS_FIXED_PAGINATION } from 'src/assets/configs/layout.config';

@Component({
  selector: 'cbbank-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  itemsPerPage: number[];

  @Output() pageChange = new EventEmitter<number>();
  @Output() itemPerPageChange = new EventEmitter<number>();
  @Input() isFixed: boolean = IS_FIXED_PAGINATION; fixedWithSidebar: boolean;
  @Input() total: number;
  @Input() currentPage: number = 1;
  @Input() itemPerPage;

  constructor(
   private sidebarService: SidebarService ,
   public cdr: ChangeDetectorRef,
   private systemSettingService: SystemSettingService
  ) { 
    this.itemsPerPage = this.systemSettingService.getSetting()?.pageSizes;
    this.itemPerPage = this.itemsPerPage[0]

    this.sidebarService.getSidebarStatus().subscribe(isSidebarExpand => {
      this.fixedWithSidebar = isSidebarExpand;
      this.cdr.detectChanges();
    })
  }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.sidebarService.checkSidebarExpand();
  }

  paginationChanged(currentPage: number) {
    this.currentPage = currentPage;
    this.pageChange.emit(currentPage);
  }

  itemPerPageChanged($event: number) {
    this.itemPerPageChange.emit($event);
  } 

  ngOnChanges(changes: SimpleChanges) {
  }
  
}
