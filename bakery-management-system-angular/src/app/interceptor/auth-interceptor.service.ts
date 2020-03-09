import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptorService implements  HttpInterceptor {

  constructor(public userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.getToken();
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${(token ? token : '')}`
      }
    });
    return next.handle(request);
  }

}
