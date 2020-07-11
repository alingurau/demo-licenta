import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { User } from 'src/app/models/user.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Stock } from 'src/app/models/stock.model';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  selectedFile: File;

  superUserID: number;
  superUserEntity: User;
  isAdmin: boolean;

  displayedColumns = ['position', 'code', 'product', 'quantity', 'unitMeasure', 'actions'];
  dataSource: MatTableDataSource<Stock>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private stockService: StockService,
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
          this.getStocks();
        });
      } else {
        userSubcr = this.userService.getUser().subscribe((user: User) => {
          this.superUserID = user.id;
          this.superUserEntity = user;
          this.getStocks();
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

  getStocks() {
    const stocksSubscr = this.stockService.getStocks(+this.superUserEntity.id).subscribe((stocks: Stock[]) => {
      stocks.map((item, index) => {
        item.position = ++index;
      });

      this.dataSource = new MatTableDataSource(stocks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.addSubscription(stocksSubscr);
  }

  deleteStock(id: number) {
    const deleteSubscr = this.stockService.deleteStock(id).subscribe((response: boolean) => {
      if (response) {
        this.getStocks();
      }
    });
  }

  ngOnDestroy() {
    this.dispose();
  }
}
