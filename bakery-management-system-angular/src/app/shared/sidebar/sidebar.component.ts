import { SelfUnsubscribe } from '../self-unsubscribe';
import { UserService } from './../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends SelfUnsubscribe implements OnInit, OnDestroy {
  user: User;
  isAdmin = false;
  isActive = false;
  showMenu = '';
  pushRightClass = 'push-right';

  constructor(
    private userService: UserService,
    public router: Router
  ) {
    super();

    const routerSubscr = this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
    this.addSubscription(routerSubscr);
  }

  ngOnInit() {
    const userScrb = this.userService.getUser()
    .subscribe(
      (user: User) => {
        this.user = user;
        this.isAdmin = this.userService.isAdmin();
      }
    );
    this.addSubscription(userScrb);
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLogout() {
    const logoutSubscr = this.userService.logout()
      .subscribe(
        (status) => {
          if (status) {
            this.toggleSidebar();
            this.router.navigate(['/login']);
          }
        }
      );

    this.addSubscription(logoutSubscr);
    }

  ngOnDestroy() {
    this.dispose();
  }
}
