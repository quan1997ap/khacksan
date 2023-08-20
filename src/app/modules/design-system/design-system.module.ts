import { FormSharedModule } from './../../core/shared/form.shared.module';
import { OtherElementComponent } from './other-element/other-element.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListingSharedModule } from 'src/app/core/shared/listing.shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignSystemComponent } from './design-system/design-system.component';
import { ListingComponent } from './listing/listing.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MatSliderModule } from '@angular/material/slider';
import { HighlightJsModule } from 'ngx-highlight-js';
import { ElementsComponent } from './elements/elements.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'components'
  },
  {
    path: 'components',
    children: [
      {
        path: '',
        component: DesignSystemComponent
      },
      {
        path: 'listing',
        component: ListingComponent
      },
      {
        path: 'elements',
        component: ElementsComponent
      },
      {
        path: 'other-elements',
        component: OtherElementComponent
      },
      {
        path: '',
        redirectTo: '404',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [
    DesignSystemComponent,
    ListingComponent,
    ElementsComponent,
    OtherElementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ListingSharedModule,
    ReactiveFormsModule,
    InlineSVGModule,
    MatSliderModule,
    HighlightJsModule,
    MatExpansionModule,
    MatTabsModule,
    //other
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormSharedModule,
    MatSlideToggleModule
  ]
})

export class DesignSystemModule { }
