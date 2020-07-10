import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { NgForm } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import { Client } from 'src/app/models/client.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

orderEntity: Order;
recipes: Recipe[] = [];
date: {
  begin: Date,
  end: Date
};

  constructor(
    private orderService: OrderService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    super();
   }

  ngOnInit() {
    const params = this.route.snapshot.params;

    if ('id' in params) {
      this.getOrderById(+params.id);
    }

    this.getRecipes();

  }

  getOrderById(id): void {
    const orderSubscr = this.orderService.getOrder(id).subscribe((order: Order) => {
      this.orderEntity = order;
      this.orderEntity.start = new Date(this.orderEntity.start);
      this.orderEntity.end = new Date(this.orderEntity.end);
      this.date = {
        begin: this.orderEntity.start,
        end: this.orderEntity.end
      };
    });
    this.addSubscription(orderSubscr);
  }

  getRecipes(): void {
    const slsubscr = this.recipeService.getRecipes()
      .subscribe((recipeList: Recipe[]) => {
        this.recipes = recipeList;
      });

    this.addSubscription(slsubscr);
  }

  onRecipeChange(id) {
    const slsubscr = this.recipeService.getRecipe(id)
      .subscribe((recipe: Recipe) => {

        this.orderEntity.recipe.id = recipe.id;

      });

    this.addSubscription(slsubscr);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.orderEntity.start = event.value['begin'];
    this.orderEntity.end = event.value['end'];

  }

  updateDate() {
    this.date = {
      begin: this.orderEntity.start,
      end: this.orderEntity.end
    };
  }

  // getOrder(id: number): void {
  //   const orderSubscr = this.orderService.getOrder(id).subscribe((order: Order) => {
  //     this.orderEntity = order;
  //     this.orderEntity.clientId = order.clientId;
  //   });
  //   this.addSubscription(orderSubscr);
  // }

  onSubmot(form: NgForm) {
    if (form.valid) {
      const orderSubscr = this.orderService.updateOrder(this.orderEntity, this.orderEntity.id).subscribe((response) => {
        orderSubscr.unsubscribe();
        if (response) {
          this.router.navigate(['/clients', this.orderEntity.clientId['id'], 'orders']);
        }
      });
      this.addSubscription(orderSubscr);
    }
  }
  // onSubmit(form: NgForm) {
  //   if (form.valid) {
  //     form.value.id = this.orderEntity.id;
  //     const orderSubscr = this.orderService.updateOrder(form.value, this.orderEntity.id)
  //       .subscribe((response) => {
  //         orderSubscr.unsubscribe();
  //         if (response) {
  //           this.messageService.showMessage('Order type successfully updated!', 'success');
  //           this.router.navigate(['/orders'], {relativeTo: this.route});
  //         }
  //       });
  //     this.addSubscription(orderSubscr);
  //   }
  // }

  ngOnDestroy() {
    // this.orderService.dispose();
    this.dispose();
  }

}
