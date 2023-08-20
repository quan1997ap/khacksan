
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ExInput } from './demo/ex-input';
import { ExButton } from './demo/ex-button';
import { ExSelect } from './demo/ex-select';
import { ExToggle } from './demo/toggle';
import { ExCheckbox } from './demo/checkbox';
import { ExSlider } from './demo/slider';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent implements OnInit {

  ExInput = ExInput;
  ExButton = ExButton;
  ExSelect = ExSelect;
  ExToggle = ExToggle;
  ExCheckbox = ExCheckbox;
  ExSlider = ExSlider;


  items = [ {id: 1, name: 'New item'}, {id: 2, name: 'New item1'}];
  searchForm: FormGroup;
  checkboxForm: FormGroup;
  toggleForm: FormGroup;
  rangeConfig:{ min: number, max: number} = { min: 0, max: 100};
  rangeValue = 40;
  number = 100;
  checked=false;

  constructor(
    private fb: FormBuilder
  ) { 
    // Search 
    this.checkboxForm = this.fb.group({ checked: true , unchecked: false});
    this.toggleForm = this.fb.group({ checked: false });

    this.searchForm = this.fb.group({ textSearch: '' });
    this.searchForm.controls['textSearch'].valueChanges
    .pipe(
        debounceTime(500),
        distinctUntilChanged()
    )
    .subscribe(textSearch => {
    });
  }

  ngOnInit(){
    
  }
}
