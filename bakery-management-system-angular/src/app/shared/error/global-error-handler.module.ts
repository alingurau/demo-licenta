import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandler } from './global-error-handler';
import { MessagesModule } from '../messages/messages.module';

@NgModule({
  imports: [
    CommonModule,
    MessagesModule
  ],
  declarations: [],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
})
export class GlobalErrorHandlerModule { }
