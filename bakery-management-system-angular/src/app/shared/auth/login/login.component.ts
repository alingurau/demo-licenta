import { User } from './../../../models/user.model';
import { MessageService } from './../../../services/message.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { SelfUnsubscribe } from '../../self-unsubscribe';
import { UserService } from '../../../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    public router: Router
  ) {
    super();
  }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const loginSubscr = this.userService.login(form.value.email, form.value.password)
        .subscribe(
          (status) => {
          if (status) {
            this.router.navigate(['/dashboard']);
            const userSubscr = this.userService.getUser().subscribe((user: User) => {
                this.messageService.showMessage('Welcome back ' + user.lastName + '!', 'success');
            });
            this.addSubscription(userSubscr);
          }
        });

      this.addSubscription(loginSubscr);
    }

    if (!form.touched) {
      this.messageService.showMessage('Please, fill your credentials!', 'danger');
    }
  }

  ngOnDestroy() {
    this.dispose();
  }
}
