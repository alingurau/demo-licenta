import { Injectable } from '@angular/core';
import { SelfUnsubscribe } from '../shared/self-unsubscribe';
import { MessageService } from './message.service';
import { RequestManager } from './request-manager.service';
import { Observable, Observer } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends SelfUnsubscribe{

  constructor(
    private messageService: MessageService,
    private requestManager: RequestManager
  ) {
    super();
  }

    getRecipes(): Observable<Array<Recipe>> {
      return new Observable<Array<Recipe>>((observer: Observer<Array<Recipe>>) => {
        const subscr = this.requestManager.getRecipes()
          .subscribe(
            (response) => {
              const recipes: Recipe[] = [];
              for (const recipeData of response) {
                recipes.push(new Recipe(recipeData));
              }
              observer.next(recipes);
            },
            (err) => {
              observer.next([]);
              this.messageService.showMessage(err.error.message, 'danger');
            }
          );
  
        this.addSubscription(subscr);
      });
    }
  
    getRecipe(id: number): Observable<Recipe> {
      return new Observable<Recipe>((observer: Observer<Recipe>) => {
        const subscr = this.requestManager.getRecipe(id)
          .subscribe(
            (response) => {
              const recipe = new Recipe(response);
              observer.next(recipe);
            },
            (err) => {
              this.messageService.showMessage(err.error.message, 'danger');
            }
          );
        this.addSubscription(subscr);
      });
    }
  
    createRecipe(recipe: Recipe): Observable<boolean> {
      return new Observable<boolean>((observer: Observer<boolean>) => {
        const subscr = this.requestManager.createRecipe(recipe)
          .subscribe(
            (response) => {
              observer.next(true);
            },
            (err) => {
              observer.next(false);
              this.messageService.showMessage(err.error.message, 'danger');
            }
          );
  
        this.addSubscription(subscr);
      });
    }
  
    updateRecipe(recipe: Recipe, id: number): Observable<boolean> {
      return new Observable<boolean>((observer: Observer<boolean>) => {
        const subscr = this.requestManager.updateRecipe(recipe, id)
          .subscribe(
            (response) => {
              observer.next(true);
            },
            (err) => {
              observer.next(false);
              this.messageService.showMessage(err.error.message, 'danger');
            }
          );
  
        this.addSubscription(subscr);
      });
    }
  
    deleteRecipe(id: number): Observable<boolean> {
      return new Observable<boolean>((observer: Observer<boolean>) => {
        const subscr = this.requestManager.deleteRecipe(id)
          .subscribe(
            (response) => {
              observer.next(true);
            },
            (err) => {
              observer.next(false);
              this.messageService.showMessage(err.error.message, 'danger');
            }
          );
  
        this.addSubscription(subscr);
      });
    }
}
