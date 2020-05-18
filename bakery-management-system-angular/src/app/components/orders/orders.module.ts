import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'src/app/shared/layout/app/app.component';
import { OrderComponent } from './order/order.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { LoggedInGuard } from 'src/app/services/guards/logged-in.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalConfirmationModule } from 'src/app/shared/modal/confirmation/confirmation.module';
import { LimitToModule } from 'src/app/pipes/limit-to/limit-to.module';
import { UntilNowModule } from 'src/app/pipes/until-now/until-now.module';
import { MatButtonModule, MatInputModule, MatTableModule,
  MatPaginatorModule, MatSortModule, MatSelectModule, MatTooltipModule,
  MatBadgeModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'clients/:id/orders', component: OrderComponent, canActivate: [LoggedInGuard] },
      { path: 'clients/:id/orders/create', component: OrderCreateComponent, canActivate: [LoggedInGuard] },
      { path: 'orders/:id/edit', component: OrderEditComponent, canActivate: [LoggedInGuard] }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ModalConfirmationModule,
    LimitToModule,
    UntilNowModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatTooltipModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SatDatepickerModule,
    SatNativeDateModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot()
  ],
  declarations: [
    OrderComponent,
    OrderCreateComponent,
    OrderEditComponent
  ],
  providers: [
    LoggedInGuard
  ]
})
export class OrdersModule { }
