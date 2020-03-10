import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../../services/guards/logged-in.service';
import { IsAnonymousGuard } from '../../services/guards/is-anonymous.service';
import { IsAdminGuard } from '../../services/guards/is-admin.service';
import { IsSuperUserGuard } from '../../services/guards/is-superUser.service';
import { ClientComponent } from '../clients/client/client.component';
import { ClientEditComponent } from '../clients/client-edit/client-edit.component';
import { SuperUserComponent } from './super-user/super-user.component';
import { ModalConfirmationModule } from '../../shared/modal/confirmation/confirmation.module';
import { FormsModule } from '@angular/forms';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { CustomFormsModule } from 'ng2-validation';
import {
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatIconModule,
  MatSelectModule,
  MatCardModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutComponent } from '../../shared/layout/app/app.component';
import { SuperUserEditComponent } from './super-user-edit/super-user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'superUsers', component: SuperUserComponent, canActivate: [LoggedInGuard, IsAdminGuard] },
      {
        path: 'superUsers/create', component: SuperUserEditComponent, canActivate: [LoggedInGuard, IsAdminGuard],
        data: { ownContent: false, newContent: true }
      },
      {
        path: 'superUsers/:id/edit', component: SuperUserEditComponent, canActivate: [LoggedInGuard, IsAdminGuard],
        data: { ownContent: false, newContent: false }
      },
      { path: 'superUsers/:superUserID/clients', component: ClientComponent, canActivate: [LoggedInGuard, IsAdminGuard] },
      {
        path: 'superUsers/:superUserID/clients/create', component: ClientEditComponent, canActivate: [LoggedInGuard, IsAdminGuard],
        data: { newContent: true, ownClient: false }
      },
      {
        path: 'superUsers/:superUserID/clients/:id/edit', component: ClientEditComponent, canActivate: [LoggedInGuard, IsAdminGuard],
        data: { newContent: false, ownClient: false }
      },
      {
        path: 'my-account/edit', component: SuperUserEditComponent, canActivate: [LoggedInGuard],
        data: { ownContent: true, newContent: false }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ModalConfirmationModule,
    FormsModule,
    PasswordStrengthBarModule,
    CustomFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SuperUserComponent,
    SuperUserEditComponent
  ],
  providers: [
    LoggedInGuard,
    IsAnonymousGuard,
    IsAdminGuard,
    IsSuperUserGuard
  ]
})
export class SuperUserModule { }
