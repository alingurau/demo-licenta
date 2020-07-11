import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './interceptor/auth-interceptor.service';
import { ApplicationInterceptorService } from './interceptor/application-interceptor.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ClientsModule } from './components/clients/clients.module';
import { MyOrdersModule } from './components/my-orders/my-orders.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ModalConfirmationModule } from './shared/modal/confirmation/confirmation.module';
import { MessagesModule } from './shared/messages/messages.module';
import { MatButtonModule } from '@angular/material';
import { HeaderModule } from './shared/header/header.module';
import { SidebarModule } from './shared/sidebar/sidebar.module';
import { LoginModule } from './shared/auth/login/login.module';
import { GlobalErrorHandlerModule } from './shared/error/global-error-handler.module';
import { AppLayoutModule } from './shared/layout/app/app.module';
import { LoginLayoutModule } from './shared/layout/login/login.module';
import { OrdersModule } from './components/orders/orders.module';
import { RecipesModule } from './components/recipes/recipes.module';
import { IngredientsModule } from './components/ingredients/ingredients.module';
import { SuperUserModule } from './components/super-user/super-user.module';
import { StocksModule } from './components/stocks/stocks.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppLayoutModule,
    LoginLayoutModule,
    ModalConfirmationModule,
    SuperUserModule,
    MessagesModule,
    DashboardModule,
    ClientsModule,
    StocksModule,
    OrdersModule,
    RecipesModule,
    IngredientsModule,
    AppRoutingModule,
    MyOrdersModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HeaderModule,
    SidebarModule,
    LoginModule,
    GlobalErrorHandlerModule,
    MatButtonModule,
    NgbModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApplicationInterceptorService,
      multi: true
    },
    {
      provide: APP_BASE_HREF,
      useValue : '/'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
