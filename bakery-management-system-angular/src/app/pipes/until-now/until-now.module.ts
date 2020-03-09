import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntilNowPipe } from './until-now.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UntilNowPipe
  ],
  exports: [
    UntilNowPipe
  ]
})
export class UntilNowModule { }
