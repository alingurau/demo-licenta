import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginLayoutComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { MessagesModule } from '../../messages/messages.module';
import { HeaderModule } from '../../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    MessagesModule,
    HeaderModule,
    RouterModule
  ],
  declarations: [
    LoginLayoutComponent
  ],
  exports: [
    LoginLayoutComponent
  ]
})
export class LoginLayoutModule { }
