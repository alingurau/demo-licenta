import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { Order } from 'src/app/models/order.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  clientEntity: Client;
  orders: Order[];
  today: number = Date.now();
  displayedColumns = ['position', 'name', 'description', 'start', 'end', 'recipe', 'actions'];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private orderService: OrderService,
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {
    super();
    setInterval(() => {this.today = Date.now()}, 1);
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
    const paramSubscr = this.route.params.subscribe((params: Params) => {
      const clientId = +params.id;
      const clientSubscr = this.clientService.getClient(clientId).subscribe((client: Client) => {
        this.clientEntity = client;
        const subscr = this.orderService.getOrders(this.clientEntity.id).subscribe((orders: Order[]) => {
          orders.map((item, index) => {
            item.position = ++index;
          });

          this.dataSource = new MatTableDataSource(orders);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.addSubscription(subscr);
      });
      this.addSubscription(clientSubscr);
    });
    this.addSubscription(paramSubscr);
  }

  deleteLicense(id: number) {
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
