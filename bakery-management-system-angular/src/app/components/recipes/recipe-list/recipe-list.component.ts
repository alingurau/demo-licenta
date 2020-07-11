import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Params } from '@angular/router';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  superUserID: number;
  superUserEntity: User;
  isAdmin: boolean;
  recipes: Recipe[];


  displayedColumns = ['position', 'name', 'description', 'imagePath', 'actions'];
  dataSource: MatTableDataSource<Recipe>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {
    super();
   }

  ngOnInit() {
    // this.getRecipes();
    const paramSubcr = this.route.params.subscribe((params: Params) => {
      let userSubcr: Subscription;

      if ('superUserID' in params) {
        this.superUserID = params.superUserID;
        userSubcr = this.userService.loadUser(+params.superUserID).subscribe((user: User | boolean) => {
          if (user) {
            this.superUserEntity = <User>user;
          }
          this.getRecipes();
        });
      } else {
        userSubcr = this.userService.getUser().subscribe((user: User) => {
          this.superUserID = user.id;
          this.superUserEntity = user;
          this.getRecipes();
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

  // getRecipes() {
  //   const recipeSubscr = this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
  //     recipes.map((item, index) => {
  //       item.position = ++index;
  //       this.recipes = recipes;
  //     });
  //     this.dataSource = new MatTableDataSource(recipes);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   });
  //   this.addSubscription(recipeSubscr);
  // }

  getRecipes() {
    const recipesSubscr = this.recipeService.getRecipesList(+this.superUserEntity.id).subscribe((recipes: Recipe[]) => {
      recipes.map((item, index) => {
        item.position = ++index;
      });

      this.dataSource = new MatTableDataSource(recipes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.addSubscription(recipesSubscr);
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
