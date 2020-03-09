import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../../services/guards/logged-in.service';
import { IsAnonymousGuard } from '../../services/guards/is-anonymous.service';
import { IsAdminGuard } from '../../services/guards/is-admin.service';
import { IsSuperUserGuard } from '../../services/guards/is-superUser.service';
import { MyOrdersComponent } from './my-orders.component';
import { LimitToModule } from '../../pipes/limit-to/limit-to.module';
import { UntilNowModule } from '../../pipes/until-now/until-now.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmationModule } from '../../shared/modal/confirmation/confirmation.module';
import {
  MatTableModule,
  MatButtonModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatTooltipModule
} from '@angular/material';
import { AppLayoutComponent } from '../../shared/layout/app/app.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'my-orders', component: MyOrdersComponent, canActivate: [LoggedInGuard, IsSuperUserGuard] }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    LimitToModule,
    UntilNowModule,
    NgbModule,
    ModalConfirmationModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MyOrdersComponent
  ],
  providers: [
    LoggedInGuard,
    IsAnonymousGuard,
    IsAdminGuard,
    IsSuperUserGuard
  ]
})
export class MyOrdersModule { }
