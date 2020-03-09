import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAnonymousGuard } from './services/guards/is-anonymous.service';
import { LoginComponent } from './shared/auth/login/login.component';
import { LoginLayoutComponent } from './shared/layout/login/login.component';
import { AppLayoutComponent } from './shared/layout/app/app.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [IsAnonymousGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
