import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientCreateComponent } from './ingredient-create/ingredient-create.component';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'src/app/shared/layout/app/app.component';
import { LoggedInGuard } from 'src/app/services/guards/logged-in.service';
import { IsAdminGuard } from 'src/app/services/guards/is-admin.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { ModalConfirmationModule } from 'src/app/shared/modal/confirmation/confirmation.module';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { IsAnonymousGuard } from 'src/app/services/guards/is-anonymous.service';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'ingredients', component: IngredientsComponent },
      { path: 'ingredients/create', component: IngredientCreateComponent },
      // { path: 'ingredients/:id/edit', component: LicenseTypesEditComponent, canActivate: [LoggedInGuard] }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    ModalConfirmationModule,
    RouterModule.forChild(routes)  ],
  declarations: [
    IngredientCreateComponent,
    IngredientsComponent,
    IngredientEditComponent],
  providers: [
    LoggedInGuard,
    IsAnonymousGuard,
    IsAdminGuard,
  ]
})
export class IngredientsModule { }
