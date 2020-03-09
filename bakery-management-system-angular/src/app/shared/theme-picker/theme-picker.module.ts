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
import { KeysPipeModule } from '../../pipes/keys/keys.module';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatTooltipModule,
    KeysPipeModule
  ],
  declarations: [
    ThemePickerComponent
  ],
  exports: [
    ThemePickerComponent
  ]
})
export class ThemePickerModule { }
