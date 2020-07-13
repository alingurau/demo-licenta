import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { User } from 'src/app/models/user.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Stock } from 'src/app/models/stock.model';
import { StockService } from 'src/app/services/stock.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

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

  printPage() {
    window.print();
  }

  public captureScreen() {
    const data = document.getElementById('pdfTable');  //Id of the table
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      // const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      // const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

  // generateReport() {
  //   google.charts.load('current', {'packages':['corechart']});
  //   google.charts.setOnLoadCallback(drawChart);

  //   function drawChart() {

  //     var data = google.visualization.arrayToDataTable([
  //       ['Task', 'Hours per Day'],
  //       ['Work',     11],
  //       ['Eat',      2],
  //       ['Commute',  2],
  //       ['Watch TV', 2],
  //       ['Sleep',    7]
  //     ]);

  //     var options = {
  //       title: 'My Daily Activities'
  //     };

  //     var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  //     chart.draw(data, options);
  //   }
  // }

  ngOnDestroy() {
    this.dispose();
  }
}