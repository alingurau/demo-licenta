import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class IsAnonymousGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router) { }

  canActivate() {
    const loggedIn = this.userService.isLoggedIn();

    if (!loggedIn) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
    }

    return false;
  }
}
