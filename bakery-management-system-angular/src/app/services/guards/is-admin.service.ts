import { Injectable } from '@angular/core';
import {UserService} from '../user.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router) { }

  canActivate() {
    const isAdmin = this.userService.isAdmin();

    if (isAdmin) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
    }

    return false;
  }
}
