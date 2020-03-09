import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsTimestampPipe } from './js-timestamp.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    JsTimestampPipe
  ],
  exports: [
    JsTimestampPipe
  ]
})
export class JsTimestampModule { }
