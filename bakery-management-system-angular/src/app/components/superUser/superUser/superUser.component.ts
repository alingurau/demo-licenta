import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { SuperUserService } from '../../../services/superUser.service';
import { SelfUnsubscribe } from '../../../shared/self-unsubscribe';
import { User } from '../../../models/user.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-salesman',
  templateUrl: './salesman.component.html',
  styleUrls: ['./salesman.component.scss']
})
export class SuperUserComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  superUserList = [];
  isAdmin: boolean;
  displayedColumns = ['position', 'username', 'firstName', 'actions'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private superUserService: SuperUserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    this.isAdmin = this.userService.isAdmin();
  }

  ngOnInit() {
     this.getSalesmans();
  }

  getSalesmans() {
    const slsubscr = this.superUserService.getSuperUser()
      .subscribe((salesmanList: User[]) => {
        salesmanList.map((item, index) => {
          item.position = ++index;
        });

        this.dataSource = new MatTableDataSource(salesmanList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    this.addSubscription(slsubscr);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();

    this.dataSource.filter = filterValue;
  }

  deleteSalesman(id: number) {
    const deleteSubscr = this.superUserService.deleteSuperUser(id).subscribe((response: boolean) => {
      if (response) {
        this.getSalesmans();
      }
    });
  }

  ngOnDestroy() {
    this.superUserService.dispose();
    this.dispose();
  }

}
