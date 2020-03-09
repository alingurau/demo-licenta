import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable, Subscription } from 'rxjs';
import { RequestManager } from './request-manager.service';
import { User } from '../models/user.model';
import { SelfUnsubscribe } from '../shared/self-unsubscribe';
import { ICrudResponse } from '../interfaces/crud-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SuperUserService extends SelfUnsubscribe {

  constructor(
    private messageService: MessageService,
    private requestManager: RequestManager
  ) {
    super();
  }

  getSuperUser(): Observable<Array<User>> {
    return new Observable<Array<User>>((observer: Observer<Array<User>>) => {
      const subscr = this.requestManager.getSuperUserList()
        .subscribe(
          (response) => {
            const superUser: User[] = [];
            for (const user of response) {
              superUser.push(new User(user));
            }

            observer.next(superUser);
          },
          (err) => {
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );

      this.addSubscription(subscr);
    });
  }

  getSuperUserFiltered(term: string): Observable<Array<any>> {
    return new Observable<Array<any>>((observer: Observer<Array<any>>) => {
      const subscr = this.requestManager.getSuperUserFiltered(term)
        .subscribe(
          (response) => {
            observer.next(response);
          },
          (err) => {
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );

      this.addSubscription(subscr);
    });
  }

  createSuperUser(userEntity: User, password: any): Observable<ICrudResponse> {
    return new Observable<ICrudResponse>((observer: Observer<ICrudResponse>) => {
      const subscr = this.requestManager.createUser(userEntity, password)
        .subscribe(
          (response: any) => {
            const toReturn = {
              status: 1,
              message: 'Ok'
            };
            observer.next(toReturn);
          },
          (err) => {
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );

      this.addSubscription(subscr);
    });
  }

  updateSuperUser(userEntity: User, password?: any): Observable<ICrudResponse> {
    return new Observable<ICrudResponse>((observer: Observer<ICrudResponse>) => {
      const subscr = this.requestManager.updateUser(userEntity, password)
        .subscribe(
          (response: any) => {
            const toReturn = {
              status: 1,
              message: 'Ok'
            };
            observer.next(toReturn);
          },
          (err) => {
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );

      this.addSubscription(subscr);
    });
  }

  deleteSuperUser(id: number): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const subscr = this.requestManager.deleteSuperUser(id)
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
