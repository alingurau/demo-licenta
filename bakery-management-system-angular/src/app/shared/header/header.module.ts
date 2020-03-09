import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { ThemePickerModule } from '../theme-picker/theme-picker.module';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    ThemePickerModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
