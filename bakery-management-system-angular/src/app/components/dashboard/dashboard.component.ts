import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {SelfUnsubscribe} from '../../shared/self-unsubscribe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  user: User;

  constructor(
    private userService: UserService,
    ) {
    super();
  }

  ngOnInit() {
    const userScrb = this.userService.getUser()
      .subscribe(
        (user: User) => {
          this.user = user;
        }
      );

    this.addSubscription(userScrb);
  }

  ngOnDestroy() {
    this.dispose();
  }
}
