import { Injectable } from '@angular/core';
import { SelfUnsubscribe } from '../shared/self-unsubscribe';
import { Ingredient } from '../models/ingredient.model';
import { MessageService } from './message.service';
import { RequestManager } from './request-manager.service';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService extends SelfUnsubscribe {

  constructor(
    private requestManager: RequestManager,
    private messageService: MessageService
  ) {
    super();
   }

   createIngredient(ingredient: Ingredient): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const subscr = this.requestManager.createIngredient(ingredient)
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

  updateIngredient(ingredient: Ingredient, id: number): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const subscr = this.requestManager.updateIngredient(ingredient, id)
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

  getIngredients(): Observable<Array<Ingredient>> {
    return new Observable<Array<Ingredient>>((observer: Observer<Array<Ingredient>>) => {
      const subscr = this.requestManager.getIngredients()
        .subscribe(
          (response) => {
            const ingredients: Ingredient[] = [];
            for (const ingredient of response) {
              ingredients.push(new Ingredient(ingredient));
            }

            observer.next(ingredients);
          },
          (err) => {
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );

      this.addSubscription(subscr);
    });
  }

  getIngredient(ingredientID: number): Observable<Ingredient> {
    return new Observable<Ingredient>((observer: Observer<Ingredient>) => {
      const subscr = this.requestManager.getIngredient(ingredientID)
        .subscribe(
          (response) => {
            const ingredient = new Ingredient(response);
            observer.next(ingredient);
          },
          (err) => {
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );

      this.addSubscription(subscr);
    });
  }

  deleteIngredient(id: number): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const subscr = this.requestManager.deleteIngredient(id)
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
