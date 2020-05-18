import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  clientID: number;
  // ingredients: Ingredient[] = [];
  recipe = new Recipe({
    id: 0,
    ingredients: [],
    name: '',
    description: '',
    imagePath: '',
  });

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) {
    super();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.getIngredients();
  }

  getIngredients(): void {
    const slsubscr = this.ingredientService.getIngredients()
      .subscribe((ingredientsList: Ingredient[]) => {
        this.recipe.ingredients = ingredientsList;
      });

    this.addSubscription(slsubscr);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const recipeSubscr = this.recipeService.createRecipe(this.recipe).subscribe((response) => {
        recipeSubscr.unsubscribe();
        if (response) {
          this.router.navigate(['../../ingredients/create'], {relativeTo: this.route});
        }
      });
      this.addSubscription(recipeSubscr);
    }
  }

  ngOnDestroy() {
    this.dispose();
  }
}
