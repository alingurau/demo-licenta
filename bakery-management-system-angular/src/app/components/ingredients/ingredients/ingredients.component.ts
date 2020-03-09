import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Ingredient } from 'src/app/models/ingredient.model';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  displayedColumns = ['position', 'name', 'amount', 'unitMeasure', 'actions'];
  dataSource: MatTableDataSource<Ingredient>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private ingredientService: IngredientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.getIngredients();
  }

  getIngredients(): void  {
    const ingredientSubscr = this.ingredientService.getIngredients()
      .subscribe((ingredientsList: Ingredient[]) => {
        ingredientsList.map((item, index) => {
          item.position = ++index;
        });

        this.dataSource = new MatTableDataSource(ingredientsList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    this.addSubscription(ingredientSubscr);
  }

  deleteLicenseType(id: number) {
    const deleteSubscr = this.ingredientService.deleteIngredient(id).subscribe((response: boolean) => {
      if (response) {
        this.getIngredients();
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();

    this.dataSource.filter = filterValue;
  }

  ngOnDestroy() {
    this.ingredientService.dispose();
    this.dispose();
  }

}
