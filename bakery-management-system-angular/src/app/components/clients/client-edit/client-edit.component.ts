import { Observer } from 'rxjs/Observer';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of, concat } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelfUnsubscribe } from '../../../shared/self-unsubscribe';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Client } from '../../../models/client.model';
import { ClientService } from '../../../services/client.service';
import { SuperUserService } from '../../../services/superUser.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  title: string;
  superUserEntity: User;
  clientEntity: Client;
  isAdmin: boolean;
  editStatus: number;
  status = {
    'ownClient': 1,
    'notOwnClient': 2,
    'newContent': 3,
  };
  superUsers: any;

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private superUserService: SuperUserService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    const data = this.route.snapshot.data;

    if (data.ownClient) {
      this.editStatus = this.status.ownClient;
      const userSubscr = this.userService.getUser().subscribe((user: User) => {
        this.superUserEntity = user;
        this.prepareClientObject(data);
      });
      this.addSubscription(userSubscr);
    }

    if (!data.ownContent && 'superUserID' in this.route.snapshot.params) {
      this.editStatus = this.status.notOwnClient;
      const userID = +this.route.snapshot.params.superUserID;
      const userSubscr = this.userService.loadUser(userID).subscribe((user: User) => {
        this.superUserEntity = user;
        this.prepareClientObject(data);
      });
      this.addSubscription(userSubscr);
    }

    this.isAdmin = this.userService.isAdmin();
  }

  private initSuperUserAC() {
    if (this.isAdmin) {
      const acSubscr = this.superUserService.getSuperUserFiltered('').subscribe((result) => {
        result.map((item) => {
          item.nameToShow = this.formatACName(item);
        });
        this.superUsers = result;
      });
      this.addSubscription(acSubscr);
    } else {
      const defaultUser = <any>{ ...this.superUserEntity };
      defaultUser.nameToShow = this.formatACName(this.superUserEntity);
      this.superUsers = defaultUser;
    }
  }

  formatACName(item) {
    return item.firstName + ' ' + item.lastName + ' (' + item.username + ')';
  }

  prepareClientObject(data) {
    if (!data.newContent) {
      const clientID = +this.route.snapshot.params.id;
      const clientSubscr = this.clientService.getClient(clientID).subscribe((client: Client) => {
        this.clientEntity = client;
        this.title = 'Edit ' + client.firstName + ' ' + client.lastName;
        this.initSuperUserAC();
      });
      this.addSubscription(clientSubscr);
    } else {
      this.editStatus = this.status.newContent;
      this.clientEntity = new Client({});
      delete this.clientEntity.id;
      this.clientEntity.userId = this.superUserEntity.id;
      this.title = 'Create New Client';
      this.initSuperUserAC();
    }
  }

  onSubmit(form: NgForm) {
    if (this.editStatus === this.status.newContent) {
      const createSubscr = this.clientService.createClient(this.clientEntity).subscribe((response: boolean) => {
        createSubscr.unsubscribe();
        if (response) {
          this.router.navigate(['..'], {relativeTo: this.route});
        }
      });
      this.addSubscription(createSubscr);
    } else {
      const updateSubscr = this.clientService.updateClient(this.clientEntity, +this.clientEntity.id).subscribe((response: boolean) => {
        updateSubscr.unsubscribe();
        if (response) {
          this.router.navigate(['../..'], {relativeTo: this.route});
        }
      });
      this.addSubscription(updateSubscr);
    }
  }

  ngOnDestroy() {
    this.dispose();
  }
}
