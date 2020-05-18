import { Injectable } from '@angular/core';
import { SelfUnsubscribe } from '../shared/self-unsubscribe';
import { MessageService } from './message.service';
import { RequestManager } from './request-manager.service';
import { Order } from '../models/order.model';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends SelfUnsubscribe {

  constructor(
    private messageService: MessageService,
    private requestManager: RequestManager
  ) {
    super();
  }

  getOrders(clientID: number): Observable<Array<Order>> {
    return new Observable<Order[]>((observer: Observer<Order[]>) => {
      const subscr = this.requestManager.getOrdersByClientId(clientID)
        .subscribe(
          (response) => {
            const orders: Order[] = [];
            for (const orderData of response) {
              orders.push(new Order(orderData));
            }
            observer.next(orders);
          },
          (err) => {
            observer.next([]);
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );

      this.addSubscription(subscr);
    });
  }

  getOrdersByClientId(clientID: number): Observable<Order[]> {
    return new Observable<Order[]>((observer: Observer<Order[]>) => {
      const subscr = this.requestManager.getOrdersByClientId(clientID)
        .subscribe(
          (response) => {
            const orders: Order[] = [];
            for (const orderData of response) {
              orderData.start = new Date(orderData.start).getTime();
              orderData.end = new Date(orderData.end).getTime();
              orders.push(new Order(orderData));
            }
            observer.next(orders);
          },
          (err) => {
            observer.next([]);
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );

      this.addSubscription(subscr);
    });
  }

  getAllOrdersByUserId(id: number): Observable<any> {
    return new Observable<any>((observer: Observer<any>) => {
      const subscr = this.requestManager.getAllOrdersByUserId(id)
        .subscribe(
          (response: any) => {

            observer.next(response);
          },
          (err) => {
            observer.next([]);
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );
      this.addSubscription(subscr);
    });
  }

  createOrder(order: Order): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const subscr = this.requestManager.createOrder(order)
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

  updateOrder(order: Order, id: number): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const subscr = this.requestManager.updateOrder(order, id)
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

  getOrder(orderID: number): Observable<Order> {
    return new Observable<Order>((observer: Observer<Order>) => {
      const subscr = this.requestManager.getOrder(orderID)
        .subscribe(
          (response) => {
            const order = new Order(response);
            observer.next(order);
          },
          (err) => {
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );

      this.addSubscription(subscr);
    });
  }

  deleteOrder(id: number): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const subscr = this.requestManager.deleteOrder(id)
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
