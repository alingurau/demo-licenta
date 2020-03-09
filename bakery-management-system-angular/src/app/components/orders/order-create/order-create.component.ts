import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { Order } from 'src/app/models/order.model';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { MessageService } from 'src/app/services/message.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { MatDatepickerInputEvent } from '@angular/material';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  clientEntity: Client;
  order = new Order({
    clientId: 0,
    name: '',
    description: '',
    start: '',
    end: '',
  });

  date = {
    begin: new Date,
    end: new Date
  };
  today: number = Date.now();

  constructor(
    private clientService: ClientService,
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
      this.clientEntity.id = +params.id;
    });
    this.addSubscription(subscr);

    this.order.clientId = this.clientEntity.id;

  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.order.end = event.value['end'];
  }

  onSubmit(form: NgForm) {
    if (form.valid) {

      const orderSubscr = this.orderService.createOrder(form.value)
        .subscribe((response) => {
          orderSubscr.unsubscribe();
          if (response) {
            this.router.navigate(['..'], {relativeTo: this.route});
          }
        });
      this.addSubscription(orderSubscr);
    }
  }

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
