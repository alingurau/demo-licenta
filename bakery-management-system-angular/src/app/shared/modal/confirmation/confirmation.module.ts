import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmationComponent } from './confirmation.component';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  MatButtonModule,
  MatDialogModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  declarations: [
    ModalConfirmationComponent
  ],
  exports: [
    ModalConfirmationComponent
  ]
})
export class ModalConfirmationModule { }
