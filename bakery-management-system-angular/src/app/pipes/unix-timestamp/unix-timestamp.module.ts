import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnixTimestampPipe } from './unix-timestamp.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UnixTimestampPipe
  ],
  exports: [
    UnixTimestampPipe
  ]
})
export class UnixTimestampModule { }
