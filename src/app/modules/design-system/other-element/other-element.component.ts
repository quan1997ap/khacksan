import { ExDatePicker } from './exDatePicker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-element',
  templateUrl: './other-element.component.html',
  styleUrls: ['./other-element.component.scss']
})
export class OtherElementComponent implements OnInit {
  ExDatePicker = ExDatePicker;

  dates = [
   { time: new Date()},
   { time: new Date()},
  ]

  constructor() {
  }

  
  ngOnInit(): void {
    
  }

}
