import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.model';
import { SelfUnsubscribe } from '../../shared/self-unsubscribe';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort
} from '@angular/material';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  entity: User;
  displayedColumns = ['position', 'name', 'description', 'start', 'end', 'client', 'actions'];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  clientEntity: any;

  constructor(
    private orderService: OrderService,
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.getOrders();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();

    this.dataSource.filter = filterValue;
  }

  getOrders() {
        const subscr = this.orderService.getOrders().subscribe((orders: Order[]) => {
          orders.map((item, index) => {
            item.position = ++index;
          });

          this.dataSource = new MatTableDataSource(orders);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.addSubscription(subscr);
}

  deleteOrder(id: number) {
    const deleteSubscr = this.orderService.deleteOrder(id).subscribe((response: boolean) => {
      if (response) {
        this.getOrders();
      }
    });
  }

  ngOnDestroy() {
    this.dispose();
  }
}
