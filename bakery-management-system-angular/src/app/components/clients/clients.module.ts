import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../../services/guards/logged-in.service';
import { IsAnonymousGuard } from '../../services/guards/is-anonymous.service';
import { ClientComponent } from './client/client.component';
import { IsAdminGuard } from '../../services/guards/is-admin.service';
import { IsSuperUserGuard } from '../../services/guards/is-superUser.service';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalConfirmationModule } from '../../shared/modal/confirmation/confirmation.module';

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutComponent } from '../../shared/layout/app/app.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'clients', component: ClientComponent, canActivate: [LoggedInGuard, IsSuperUserGuard] },
      {
        path: 'clients/create', component: ClientEditComponent, canActivate: [LoggedInGuard, IsSuperUserGuard],
        data: { newContent: true, ownClient: true }
      },
      {
        path: 'clients/:id/edit', component: ClientEditComponent, canActivate: [LoggedInGuard, IsSuperUserGuard],
        data: { newContent: false, ownClient: true }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    ModalConfirmationModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ClientComponent,
    ClientEditComponent
  ],
  providers: [
    LoggedInGuard,
    IsAnonymousGuard,
    IsAdminGuard,
    IsSuperUserGuard
  ]
})
export class ClientsModule { }
