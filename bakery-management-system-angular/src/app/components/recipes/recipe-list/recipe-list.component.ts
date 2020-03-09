import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute } from '@angular/router';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  recipes: Recipe[];


  displayedColumns = ['position', 'name', 'description', 'imagePath', 'actions'];
  dataSource: MatTableDataSource<Recipe>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {
    super();
   }

  ngOnInit() {
    this.getRecipes();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();

    this.dataSource.filter = filterValue;
  }

  getRecipes() {
    const recipeSubscr = this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      recipes.map((item, index) => {
        item.position = ++index;
        this.recipes = recipes;
      });
      this.dataSource = new MatTableDataSource(recipes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.addSubscription(recipeSubscr);
  }

  deleteClient(id: number) {
    const deleteSubscr = this.recipeService.deleteRecipe(id).subscribe((response: boolean) => {
      if (response) {
        this.getRecipes();
      }
    });
  }

  ngOnDestroy() {
    this.dispose();
  }

}
