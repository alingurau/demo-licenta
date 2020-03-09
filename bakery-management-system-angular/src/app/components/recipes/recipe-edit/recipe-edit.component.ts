import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent extends SelfUnsubscribe implements OnInit, OnDestroy {
  title: string;
  recipeEntity: Recipe;
  editStatus: number;
  status = {
    'ownClient': 1,
    'notOwnClient': 2,
    'newContent': 3,
  };

  constructor(
    private userService: UserService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
   }

  ngOnInit() {
  }

  prepareRecipeObject(data) {
    if (!data.newContent) {
      const recipeID = +this.route.snapshot.params.id;
      const recipeSubscr = this.recipeService.getRecipe(recipeID).subscribe((recipe: Recipe) => {
        this.recipeEntity = recipe;
        this.title = 'Edit ' + recipe.name;
      });
      this.addSubscription(recipeSubscr);
    } else {
      this.recipeEntity = new Recipe({});
      delete this.recipeEntity.id;
      this.title = 'Create New Recipe';
    }
  }

  onSubmit(form: NgForm) {
    if (this.editStatus === this.status.newContent) {
      const createSubscr = this.recipeService.createRecipe(this.recipeEntity).subscribe((response: boolean) => {
        createSubscr.unsubscribe();
        if (response) {
          this.router.navigate(['..'], {relativeTo: this.route});
        }
      });
      this.addSubscription(createSubscr);
    } else {
      const updateSubscr = this.recipeService.updateRecipe(this.recipeEntity, +this.recipeEntity.id).subscribe((response: boolean) => {
        updateSubscr.unsubscribe();
        if (response) {
          this.router.navigate(['../..'], {relativeTo: this.route});
        }
      });
      this.addSubscription(updateSubscr);
    }
  }

  ngOnDestroy() {
    this.dispose();
  }

}
