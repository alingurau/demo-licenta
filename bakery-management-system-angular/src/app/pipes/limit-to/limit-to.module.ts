import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitToPipe } from './limit-to.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LimitToPipe
  ],
  exports: [
    LimitToPipe
  ]
})
export class LimitToModule { }
