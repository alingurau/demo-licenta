import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePickerComponent } from './theme-picker.component';
import {
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatTooltipModule,
  ],
  declarations: [
    ThemePickerComponent
  ],
  exports: [
    ThemePickerComponent
  ]
})
export class ThemePickerModule { }
