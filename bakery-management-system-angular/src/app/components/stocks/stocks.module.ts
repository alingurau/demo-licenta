import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalConfirmationModule } from 'src/app/shared/modal/confirmation/confirmation.module';
import {
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './stock/stock.component';
import { LoggedInGuard } from 'src/app/services/guards/logged-in.service';
import { IsAnonymousGuard } from 'src/app/services/guards/is-anonymous.service';
import { IsAdminGuard } from 'src/app/services/guards/is-admin.service';
import { IsSuperUserGuard } from 'src/app/services/guards/is-superUser.service';
import { AppLayoutComponent } from 'src/app/shared/layout/app/app.component';
import { StockEditComponent } from './stock-edit/stock-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'stocks', component: StockComponent, canActivate: [LoggedInGuard, IsSuperUserGuard] },
      {
        path: 'stocks/create', component: StockEditComponent, canActivate: [LoggedInGuard, IsSuperUserGuard],
        data: { newContent: true, ownClient: true }
      },
      {
        path: 'stocks/:id/edit', component: StockEditComponent, canActivate: [LoggedInGuard, IsSuperUserGuard],
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
    StockComponent,
    StockEditComponent
],
  providers: [
    LoggedInGuard,
    IsAnonymousGuard,
    IsAdminGuard,
    IsSuperUserGuard
  ]
})
export class StocksModule { }
