import { Injectable } from '@angular/core';
import { SelfUnsubscribe } from '../shared/self-unsubscribe';
import { MessageService } from './message.service';
import { RequestManager } from './request-manager.service';
import { Observable, Observer } from 'rxjs';
import { Stock } from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService extends SelfUnsubscribe {

  constructor(
    private messageService: MessageService,
    private requestManager: RequestManager
  ) {
    super();
  }

  getStocks(superUserID: number): Observable<Array<Stock>> {
    return new Observable<Array<Stock>>((observer: Observer<Array<Stock>>) => {
      const subscr = this.requestManager.getStocksList(superUserID)
        .subscribe(
          (response) => {
            const stocks: Stock[] = [];
            for (const stockData of response) {
              stocks.push(new Stock(stockData));
            }
            observer.next(stocks);
          },
          (err) => {
            observer.next([]);
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );

      this.addSubscription(subscr);
    });
  }

  getStock(stockID: number): Observable<Stock> {
    return new Observable<Stock>((observer: Observer<Stock>) => {
      const subscr = this.requestManager.getStock(stockID)
        .subscribe(
          (response) => {
            const stock = new Stock(response);
            observer.next(stock);
          },
          (err) => {
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );
      this.addSubscription(subscr);
    });
  }

  createStock(stock: Stock): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const subscr = this.requestManager.createStock(stock)
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

  updateStock(stock: Stock, id: number): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const subscr = this.requestManager.updateStock(stock, id)
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

  deleteStock(id: number): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const subscr = this.requestManager.deleteStock(id)
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
