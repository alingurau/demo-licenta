import { MessageService } from './services/message.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SelfUnsubscribe } from './shared/self-unsubscribe';
import { lintSyntaxError } from 'tslint/lib/verify/lintError';
import { RoleService } from './services/role.service';
import { SuperUserService } from './services/superUser.service';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  user: User;
  isAdmin = false;
  superUserModule: any;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private superUser: SuperUserService,
    private clientService: ClientService,
    private router: Router
  ) {
    super();
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

  ngOnDestroy() {
    this.userService.dispose();
    this.roleService.dispose();
    this.superUserModule.dispose();
    this.clientService.dispose();
    this.dispose();
  }
}
