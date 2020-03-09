import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class IsSuperUserGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router) { }

  canActivate() {
    const isSuperUser = this.userService.hasRole('SUPERUSER');

    if (isSuperUser) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
    }

    return false;
  }
}
