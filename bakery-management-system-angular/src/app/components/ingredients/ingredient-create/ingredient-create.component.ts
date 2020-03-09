import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ingredient-create',
  templateUrl: './ingredient-create.component.html',
  styleUrls: ['./ingredient-create.component.scss']
})
export class IngredientCreateComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  ingredient = new Ingredient({
    id: 0
  });

  constructor(
    private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const ingredientSubscr = this.ingredientService.createIngredient(form.value)
        .subscribe((response) => {
          ingredientSubscr.unsubscribe();
          if (response) {
            this.router.navigate(['..'], {relativeTo: this.route});
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
