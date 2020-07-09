import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { SelfUnsubscribe } from '../shared/self-unsubscribe';
import { RequestManager } from './request-manager.service';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends SelfUnsubscribe {

  constructor(
    private messageService: MessageService,
    private requestManager: RequestManager
  ) {
    super();
  }

  getClients(superUserID: number): Observable<Array<Client>> {
    return new Observable<Array<Client>>((observer: Observer<Array<Client>>) => {
      const subscr = this.requestManager.getClientsList(superUserID)
        .subscribe(
          (response) => {
            const clients: Client[] = [];
            for (const clientData of response) {
              clients.push(new Client(clientData));
            }
            observer.next(clients);
          },
          (err) => {
            observer.next([]);
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );

      this.addSubscription(subscr);
    });
  }

  getClient(clientID: number): Observable<Client> {
    return new Observable<Client>((observer: Observer<Client>) => {
      const subscr = this.requestManager.getClient(clientID)
        .subscribe(
          (response) => {
            const client = new Client(response);
            observer.next(client);
          },
          (err) => {
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );
      this.addSubscription(subscr);
    });
  }

  createClient(client: Client): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const subscr = this.requestManager.createClient(client)
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

  updateClient(client: Client, id: number): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const subscr = this.requestManager.updateClient(client, id)
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

  deleteClient(id: number): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const subscr = this.requestManager.deleteClient(id)
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
