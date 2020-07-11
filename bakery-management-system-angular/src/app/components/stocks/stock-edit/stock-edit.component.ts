import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { User } from 'src/app/models/user.model';
import { Stock } from 'src/app/models/stock.model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperUserService } from 'src/app/services/superUser.service';
import { NgForm } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss']
})
export class StockEditComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  importedStock;
  title: string;
  superUserEntity: User;
  stockEntity: Stock;
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
    private stockService: StockService,
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
        this.prepareStockObject(data);
      });
      this.addSubscription(userSubscr);
    }

    if (!data.ownContent && 'superUserID' in this.route.snapshot.params) {
      this.editStatus = this.status.notOwnClient;
      const userID = +this.route.snapshot.params.superUserID;
      const userSubscr = this.userService.loadUser(userID).subscribe((user: User) => {
        this.superUserEntity = user;
        this.prepareStockObject(data);
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

  prepareStockObject(data) {
    if (!data.newContent) {
      const stockID = +this.route.snapshot.params.id;
      const stockSubscr = this.stockService.getStock(stockID).subscribe((stock: Stock) => {
        this.stockEntity = stock;
        this.title = 'Edit ' + stock.code + ' ' + stock.product;
        this.initSuperUserAC();
      });
      this.addSubscription(stockSubscr);
    } else {
      this.editStatus = this.status.newContent;
      this.stockEntity = new Stock({});
      delete this.stockEntity.id;
      this.stockEntity.userId = this.superUserEntity.id;
      this.title = 'Create New Stock';
      this.initSuperUserAC();
    }
  }

  onSubmit(form: NgForm) {
    if (this.editStatus === this.status.newContent) {
      const createSubscr = this.stockService.createStock(this.stockEntity).subscribe((response: boolean) => {
        createSubscr.unsubscribe();
        if (response) {
          this.router.navigate(['..'], {relativeTo: this.route});
        }
      });
      this.addSubscription(createSubscr);
    } else {
      const updateSubscr = this.stockService.updateStock(this.stockEntity, +this.stockEntity.id).subscribe((response: boolean) => {
        updateSubscr.unsubscribe();
        if (response) {
          this.router.navigate(['../..'], {relativeTo: this.route});
        }
      });
      this.addSubscription(updateSubscr);
    }
  }

  // uploadFile(event) {
  //   if (event.target.files.length !== 1) {
  //     console.error('No file selected');
  //   } else {
  //     const reader = new FileReader();
  //     reader.onloadend = (e) => {
  //       console.log(reader.result);
  //       if (reader.result.toString) {
  //         console.log(JSON.stringify(reader.result))
  //         console.log(e)
  //         this.importedStock = Object.assign(this.stockEntity, reader.result);
  //         console.log(this.importedStock)
  //       }
  //       // handle data processing
  //     };
  //     reader.readAsText(event.target.files[0]);
  //   }
  // }

  ngOnDestroy() {
    this.dispose();
  }
}

