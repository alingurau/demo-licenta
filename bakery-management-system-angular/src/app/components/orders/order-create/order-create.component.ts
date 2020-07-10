import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { Order } from 'src/app/models/order.model';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { MessageService } from 'src/app/services/message.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { MatDatepickerInputEvent, ThemePalette } from '@angular/material';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  clientID: number;
  recipes: Recipe[] = [];
  order = new Order({
    clientId: 0,
    recipe: {},
    name: '',
    description: '',
    start: '',
    end: '',
  });

  // multiplyRecipe;
  // newRecipe;

  date = {
    begin: new Date,
    end: new Date
  };
  today = Date.now().toLocaleString;
  dateFormat: Date;

  constructor(
    private clientService: ClientService,
    private recipeService: RecipeService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    calendar: NgbCalendar
  ) {
    super();
    this.order.start = this.today;
    // setInterval(() => {this.order.start = Date.now()}, 1);
  }

  ngOnInit() {
    const subscr = this.route.params.subscribe((params: Params) => {
      this.clientID = +params.id;
    });
    this.addSubscription(subscr);

    // Get recipes
    this.getRecipes();

    // Prepare order
    this.order.clientId = this.clientID;
  }

  onRecipeChange(id) {
    const slsubscr = this.recipeService.getRecipe(id)
      .subscribe((recipe: Recipe) => {

        this.order.recipe.id = recipe.id;
        // recipe.ingredients.forEach(element => {
        //   this.newRecipe = element.amount * this.multiplyRecipe;
        // });
        // recipe.ingredients.push(this.newRecipe);
        // console.log(this.newRecipe);
      });
    this.addSubscription(slsubscr);
  }

  getRecipes(): void {
    const slsubscr = this.recipeService.getRecipes()
      .subscribe((recipeList: Recipe[]) => {
        this.recipes = recipeList;
      });

    this.addSubscription(slsubscr);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.order.end = event.value['end'];
  }

  onSubmit(form: NgForm) {
    if (form.valid) {

      const orderSubscr = this.orderService.createOrder(this.order)
        .subscribe((response) => {
          orderSubscr.unsubscribe();
          if (response) {
            this.router.navigate(['..'], {relativeTo: this.route});
          }
        });
      this.addSubscription(orderSubscr);
    }
    // this.calculateOrderByNumberOfMultiplyRecipe();
  }

  // calculateOrderByNumberOfMultiplyRecipe() {
  //   this.recipe
  //   })
  // }

  updateDate() {
    this.date = {
      begin: this.order.start,
      end: this.order.end
    };
  }

  ngOnDestroy() {
    this.dispose();
  }

}
