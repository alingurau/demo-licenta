import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Recipe } from 'src/app/models/recipe.model';
import { Observable } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-ingredient-create',
  templateUrl: './ingredient-create.component.html',
  styleUrls: ['./ingredient-create.component.scss']
})
export class IngredientCreateComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  @Output() recipe: Observable<Recipe>;
  @Input() ingredients: Ingredient;
  // @Input() id: number;
  recipeEntity: Recipe;
  id: number;

  ingredient = new Ingredient({
    id: 0,
    recipeId: 0,
    name: '',
    amount: '',
    unitMeasure: ''
  });

  constructor(
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    // const subscr = this.route.params.subscribe((params: Params) => {
    //   this.recipeEntity.id = +params.id;
    // });
    // this.addSubscription(subscr);

    const subscr = this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
    this.recipe = this.recipeService.getRecipe(this.id);
    console.log(this.recipe)
    // this.route.params
    // .subscribe(
    //   (params: Params) => {
    //     this.id = +params['id'];
    //     this.recipe = this.recipeService.getRecipe(this.id);
    //   }
    // );
    // this.route.queryParams.subscribe(params => {
    //   this.ingredient.recipeId = params['val'];
    // });

    // const subscr = this.route.params.subscribe((params: Params) => {
    //   this.recipeEntity.id = +params.id;
    // });
    // console.log(this.recipeEntity.id);
    // this.addSubscription(subscr);

    // this.ingredient.recipeId = this.recipeEntity.id;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const ingredientSubscr = this.ingredientService.createIngredient(form.value)
        .subscribe((response) => {
          console.log(ingredientSubscr);
          // this.recipeEntity.ingredients.push(ingredientSubscr);
          ingredientSubscr.unsubscribe();
          if (response) {
            // this.recipeEntity.ingredients.push()
            // this.router.navigate(['..'], {relativeTo: this.route});
          }
        });
      this.addSubscription(ingredientSubscr);
    }
  }

  ngOnDestroy() {
    this.ingredientService.dispose();
    this.dispose();
  }
}
