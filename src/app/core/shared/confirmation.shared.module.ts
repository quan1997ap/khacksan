import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, MatIconModule, MatDialogModule],
  exports: [MatIconModule, ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  providers: [MatDialog],
})
export class ConfirmationSharedModule {
  constructor() {}
}
