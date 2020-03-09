import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { RequestManager } from './request-manager.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Observer } from 'rxjs/Observer';
import { SelfUnsubscribe } from '../shared/self-unsubscribe';
import { ICrudResponse } from '../interfaces/crud-response.interface';
import { RoleService } from './role.service';

// admin hash: $2a$10$w012TtRgIAG0Mi1xa4J.PeFASIaj/dD9L.VmP/MTxGodC8afozC7m

@Injectable({
  providedIn: 'root'
})
export class UserService extends SelfUnsubscribe {

  public roles;

  private user: User;
  private userSubject = new BehaviorSubject<User>(null);
  private token = '';

  constructor(
    private roleService: RoleService,
    private messageService: MessageService,
    private requestManager: RequestManager
  ) {
    super();

    // Get roles
     const roleSubscr = this.roleService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
    this.addSubscription(roleSubscr);

    if (this.token = localStorage.getItem('userToken') ) {
      // Logged in user, load it
      const userData = JSON.parse(localStorage.getItem('userEntity'));
      this.setLoggedUser(userData);
    } else {
      this.setAnonymousUser();
    }
  }

  getRole(role: string) {
    return role;
  }

  isLoggedIn(): boolean {
    return this.user.anonym === false;
  }

  isAdmin(): boolean {
    return this.user.role === this.roleService.getAdminRole();
  }

  hasRole(role: string) {
    return this.user.role === role;
  }

  loadUser(id: number): Observable<User | boolean> {
    return new Observable<User | boolean>((observer: Observer<User | boolean>) => {
      const subscr = this.requestManager.loadUser(id)
        .subscribe(
          (response) => {
            const user = new User(response);
            observer.next(user);
          },
          (err) => {
            observer.next(false);
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );

      this.addSubscription(subscr);
    });
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const subscr = this.requestManager.loginUser(email, password)
        .subscribe(
          (response) => {
            this.token = response.token;
            delete response.token;

            this.setLoggedUser(response);
            this.setUserStorage(response, this.token);

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

  logout(): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const subscr = this.requestManager.logoutUser(this.token)
        .subscribe(
          (response) => {
            if (response.status) {
              this.setAnonymousUser();
              this.clearUserStorage();

              observer.next(true);
            } else {
              observer.next(false);
            }
          },
          (err) => {
            observer.next(false);
            this.messageService.showMessage(err.error.message, 'danger');
          }
        );

      this.addSubscription(subscr);
    });
  }

  setUserStorage(userData: any, token: string) {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userEntity', JSON.stringify(userData));
  }

  clearUserStorage() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEntity');
  }

  setAnonymousUser() {
    this.user = new User({username: 'Anonymous', anonym: true});
    this.userSubject.next(this.user);
  }

  setLoggedUser(data: any) {
    this.user = new User(data);
    this.userSubject.next(this.user);
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  setUser(user: User) {
    this.user = user;
    this.setUserStorage(this.user, this.token);
    this.userSubject.next(this.user);
  }

  // updateUser(userEntity: User, password?: any): Observable<ICrudResponse> {
  //   return new Observable<ICrudResponse>((observer: Observer<ICrudResponse>) => {
  //     const subscr = this.requestManager.updateUser(userEntity, password)
  //       .subscribe(
  //         (response: ICrudResponse) => {
  //           observer.next(response);
  //         }
  //       );
  //
  //     this.addSubscription(subscr);
  //   });
  // }

  // createUser(userEntity: User, password: any): Observable<ICrudResponse> {
  //   return new Observable<ICrudResponse>((observer: Observer<ICrudResponse>) => {
  //     const subscr = this.requestManager.createUser(userEntity, password)
  //       .subscribe(
  //         (response: ICrudResponse) => {
  //           observer.next(response);
  //         }
  //       );
  //
  //     this.addSubscription(subscr);
  //   });
  // }

  getToken(): string | boolean {
    return this.token ? this.token : false;
  }
}

