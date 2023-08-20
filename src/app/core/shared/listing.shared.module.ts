import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

// Table module
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { MessageService } from './../services/message.service';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxPopperModule } from 'ngx-popper';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NgxMaskModule } from 'ngx-mask';

// Header Pipe
import { TableColumnPipe } from './pipes/table-column.pipe';
import { KeysPipe } from './pipes/keys.pipe';

// Service
import { ListingService } from './../services/listing.service';

// Components
import { PaginationComponent } from './components/pagination/pagination.component';
import { DownloadFileNameComponent } from './components/download/download-file-name/download-file-name.component';
import { DownloadProgressComponent } from './components/download/download-progress/download-progress.component';

// Pipes
import { NestedKeyPipe } from './pipes/nestedkey.pipe';

// Directives
import { MinMaxDirective } from './directives/min-max.directive';
import { UppercaseInputDirective } from './directives/uppercase-input.directive';
import { MatTooltipAutoDirective } from './directives/matTooltip-auto.directive';
@NgModule({
  declarations: [
    // Components
    PaginationComponent,
    DownloadFileNameComponent,
    DownloadProgressComponent,

    // Pipes
    NestedKeyPipe,
    TableColumnPipe,
    KeysPipe,

    // Directives
    MinMaxDirective,
    UppercaseInputDirective,
    MatTooltipAutoDirective
  ],
  imports: [
    CommonModule, RouterModule,
    MatIconModule, MatPaginatorModule, MatTooltipModule,
    NgxPaginationModule, MatButtonModule, MatInputModule,
    MatToolbarModule, MatDialogModule, NgSelectModule, FormsModule,
    InlineSVGModule, MatCheckboxModule, NgxPopperModule.forRoot({}),
    NgxTrimDirectiveModule, NgxMaskModule.forRoot(),
  ],
  exports: [
    // Components
    PaginationComponent,
    DownloadFileNameComponent,
    DownloadProgressComponent,
    
    // Modules
    MatIconModule, MatTableModule, MatPaginatorModule,
    MatTooltipModule, NgxPaginationModule, MatInputModule,
    MatToolbarModule, MatDialogModule, NgSelectModule, FormsModule,
    InlineSVGModule, MatCheckboxModule, NgxPopperModule, NgxMaskModule,

    // Pipes
    NestedKeyPipe,
    TableColumnPipe,
    NgxTrimDirectiveModule,
    KeysPipe,

    // Directive
    MinMaxDirective,
    UppercaseInputDirective,
    MatTooltipAutoDirective
  ],
  providers: [ListingService, MessageService]
})
export class ListingSharedModule { }
