import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client.model';
import { SelfUnsubscribe } from '../../../shared/self-unsubscribe';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  superUserID: number;
  superUserEntity: User;
  isAdmin: boolean;

  displayedColumns = ['position', 'firstName', 'phone', 'address', 'actions'];
  dataSource: MatTableDataSource<Client>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    const paramSubcr = this.route.params.subscribe((params: Params) => {
      let userSubcr: Subscription;

      if ('superUserID' in params) {
        this.superUserID = params.superUserID;
        userSubcr = this.userService.loadUser(+params.superUserID).subscribe((user: User | boolean) => {
          if (user) {
            this.superUserEntity = <User>user;
          }
          this.getClients();
        });
      } else {
        userSubcr = this.userService.getUser().subscribe((user: User) => {
          this.superUserID = user.id;
          this.superUserEntity = user;
          this.getClients();
        });
      }

      this.addSubscription(userSubcr);
    });

    this.isAdmin = this.userService.isAdmin();

    this.addSubscription(paramSubcr);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();

    this.dataSource.filter = filterValue;
  }

  getClients() {
    const clientsSubscr = this.clientService.getClients(+this.superUserEntity.id).subscribe((clients: Client[]) => {
      clients.map((item, index) => {
        item.position = ++index;
      });

      this.dataSource = new MatTableDataSource(clients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.addSubscription(clientsSubscr);
  }

  deleteClient(id: number) {
    const deleteSubscr = this.clientService.deleteClient(id).subscribe((response: boolean) => {
      if (response) {
        this.getClients();
      }
    });
  }

  ngOnDestroy() {
    this.dispose();
  }
}
