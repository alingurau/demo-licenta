import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app.component';
import { MessagesModule } from '../../messages/messages.module';
import { HeaderModule } from '../../header/header.module';
import { SidebarModule } from '../../sidebar/sidebar.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MessagesModule,
    HeaderModule,
    SidebarModule,
    RouterModule
  ],
  declarations: [
    AppLayoutComponent
  ],
  exports: [
    AppLayoutComponent
  ]
})
export class AppLayoutModule { }
