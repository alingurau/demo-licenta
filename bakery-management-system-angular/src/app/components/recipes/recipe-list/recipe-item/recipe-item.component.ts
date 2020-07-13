import { Component, OnInit, Input, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent extends SelfUnsubscribe implements OnInit {

  // recipe: Observable<Recipe>;
  id: number;

  // @Input() recipe: Observable<Recipe>;
  // @Input() id: number;

  recipeEntity = {} as Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
   }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );
    this.getRecipe();
  }

  getRecipe() {
    const recipeID = this.id;
      const recipeSubscr = this.recipeService.getRecipe(recipeID).subscribe((recipe: Recipe) => {
        this.recipeEntity = recipe;
      });
      this.addSubscription(recipeSubscr);
  }

}
