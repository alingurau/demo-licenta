import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { AppLayoutComponent } from 'src/app/shared/layout/app/app.component';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'src/app/services/guards/logged-in.service';
import { IsSuperUserGuard } from 'src/app/services/guards/is-superUser.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalConfirmationModule } from 'src/app/shared/modal/confirmation/confirmation.module';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatListModule, MatButtonModule, MatIconModule, MatSelectModule } from '@angular/material';
import { IsAnonymousGuard } from 'src/app/services/guards/is-anonymous.service';
import { IsAdminGuard } from 'src/app/services/guards/is-admin.service';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { IngredientCreateComponent } from '../ingredients/ingredient-create/ingredient-create.component';
import { IngredientsModule } from '../ingredients/ingredients.module';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'recipes', component: RecipeListComponent, canActivate: [LoggedInGuard, IsSuperUserGuard] },
      {
        path: 'recipes/create', component: RecipeCreateComponent, canActivate: [LoggedInGuard, IsSuperUserGuard],
        data: { newContent: true, ownClient: true }
      },
      {
        path: 'recipes/:id/edit', component: RecipeCreateComponent, canActivate: [LoggedInGuard, IsSuperUserGuard],
        data: { newContent: false, ownClient: true }
      },
      {
        path: 'recipe/:id/detail', component: RecipeDetailComponent
      },
      {
        path: 'recipe/:id/item', component: RecipeItemComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    IngredientsModule,
    ReactiveFormsModule,
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
    RecipeListComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeCreateComponent],
  providers: [
    LoggedInGuard,
    IsAnonymousGuard,
    IsAdminGuard,
    IsSuperUserGuard
  ]
})
export class RecipesModule { }
