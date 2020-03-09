import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../../services/guards/logged-in.service';
import { IsAnonymousGuard } from '../../services/guards/is-anonymous.service';
import { IsAdminGuard } from '../../services/guards/is-admin.service';
import { IsSuperUserGuard } from '../../services/guards/is-superUser.service';
import { DashboardComponent } from './dashboard.component';
import { AppLayoutComponent } from '../../shared/layout/app/app.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard] },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    LoggedInGuard,
    IsAnonymousGuard,
    IsAdminGuard,
    IsSuperUserGuard
  ]
})
export class DashboardModule { }
