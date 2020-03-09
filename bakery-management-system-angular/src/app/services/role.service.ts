import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { RequestManager } from './request-manager.service';
import { SelfUnsubscribe } from '../shared/self-unsubscribe';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends SelfUnsubscribe {

  private roles;
  public rolesSubject = new BehaviorSubject<any>({});

  constructor(
    private messageService: MessageService,
    private requestManager: RequestManager
  ) {
    super();

    this.getRolesData();
  }

  getAdminRole() {
    return 'ADMIN';
  }

  getRoles(): Observable<any> {
    return this.rolesSubject.asObservable();
  }

  getRolesData() {
    const subscr = this.requestManager.getRoles()
      .subscribe(
        (response) => {
          this.roles = response;
          this.rolesSubject.next(this.roles);
        },
        (err) => {
          this.messageService.showMessage(err.error.message, 'danger');
        }
      );

    this.addSubscription(subscr);
  }
}
