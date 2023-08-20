import { TableColumnModel } from './../../../core/model/listing.model';
import { ListingService } from './../../../core/services/listing.service';
import { Component, OnInit } from '@angular/core';
import { LAYOUT_CONFIG } from 'src/assets/configs/layout.config';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  LAYOUT_CONFIG = LAYOUT_CONFIG;
  
  //  Table column config 
  displayedColumns: TableColumnModel = {
    'position': { title: 'position', key: 'position', sort: 'desc' },
    'name': { title: 'name', key: 'name', sort: 'desc' },
    'weight': { title: 'weight', key: 'weight', sort: 'desc' },
    'symbol': { title: 'symbol', key: 'symbol', sort: 'desc' }
  };
  customers: any[] = [];
  dataSource = ELEMENT_DATA;

  // Table Pagination
  pageSize = 2;
  pageIndex = 0;
  currentPage = 0;
  totalItems: 100;
  // fixed Sidebar
  toolbarHeight = 200; 

  constructor(
    public listingService: ListingService
  ) { 
  }

  ngOnInit(): void {
  }


  pageChanged($event: any){
    console.log($event)
    this.currentPage = $event;
  }
}
