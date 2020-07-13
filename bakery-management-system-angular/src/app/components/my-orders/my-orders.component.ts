import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
import { UserService } from 'src/app/services/user.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  superUserEntity: User;
  displayedColumns = ['position', 'name', 'description', 'start', 'end', 'recipe', 'client', 'actions'];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('pdfTable') pdfTable: ElementRef;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
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
    const userService = this.userService.getUser().subscribe((user: User) => {
      this.superUserEntity = user;
        const orderSubscr = this.orderService.getAllOrdersByUserId(this.superUserEntity.id).subscribe((data: any[]) => {
          data.map((item, index) => {
            item.position = ++index;
          });

          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.addSubscription(orderSubscr);
      });
      this.addSubscription(userService);
}

  deleteOrder(id: number) {
    const deleteSubscr = this.orderService.deleteOrder(id).subscribe((response: boolean) => {
      if (response) {
        this.getOrders();
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

  ngOnDestroy() {
    this.dispose();
  }
}
