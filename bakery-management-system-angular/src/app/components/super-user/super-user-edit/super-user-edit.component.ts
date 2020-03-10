import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelfUnsubscribe } from '../../../shared/self-unsubscribe';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { ICrudResponse } from '../../../interfaces/crud-response.interface';
import { SuperUserService } from '../../../services/superUser.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-super-user-edit',
  templateUrl: './super-user-edit.component.html',
  styleUrls: ['./super-user-edit.component.scss']
})
export class SuperUserEditComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  superUserName: string;
  superUserEntity: User;
  editStatus: number;
  status = {
    'ownContent': 1,
    'notOwnContent': 2,
    'newContent': 3
  };
  changePasswordState = false;
  password = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(
    private userService: UserService,
    private superUserService: SuperUserService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    const data = this.route.snapshot.data;

    if (data.ownContent) {
      this.editStatus = this.status.ownContent;
      const userSubscr = this.userService.getUser().subscribe((user: User) => {
        this.superUserEntity = new User({ ... user });
      });
      this.addSubscription(userSubscr);
    }

    if (!data.ownContent && !data.newContent && 'id' in this.route.snapshot.params) {
      this.editStatus = this.status.notOwnContent;
      const userID = +this.route.snapshot.params.id;
      const userSubscr = this.userService.loadUser(userID).subscribe((user: User) => {
        this.superUserEntity = user;
        this.superUserName = user.firstName + ' ' + user.lastName;
      });
      this.addSubscription(userSubscr);
    }

    if (data.newContent) {
      this.editStatus = this.status.newContent;
      this.superUserEntity = new User({role: this.userService.getRole('SUPERUSER')});
    }
  }

  onSubmit() {
    let passToSend = null;

    if ((this.changePasswordState && this.password.newPassword) || this.editStatus === this.status.newContent) {
      passToSend = this.password;
    }

    if (this.editStatus === this.status.newContent) {
      // New user
      const subscr = this.superUserService.createSuperUser(this.superUserEntity, passToSend).subscribe(
        (response: ICrudResponse) => {
          if (response.status === 1) {
            this.router.navigate(['/superUsers']);
          } else {
            this.messageService.showMessage(response.message, 'danger');
          }
        }
      );
    } else {
      // Update user
      const subscr = this.superUserService.updateSuperUser(this.superUserEntity, passToSend).subscribe(
        (response: ICrudResponse) => {
          if (response.status === 1) {
            if (this.editStatus === this.status.ownContent) {
              this.userService.setUser(this.superUserEntity);
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/superUsers']);
            }
          } else {
            this.messageService.showMessage(response.message, 'danger');
          }
        }
      );

      this.addSubscription(subscr);
    }
  }

  onChangePassword() {
    this.changePasswordState = !this.changePasswordState;
    if (this.editStatus === this.status.notOwnContent) {
      delete this.password.currentPassword;
    }
  }

  ngOnDestroy() {
    this.dispose();
  }
}
