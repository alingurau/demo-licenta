import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { NgForm, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { SuperUserService } from 'src/app/services/superUser.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent extends SelfUnsubscribe implements OnInit, OnDestroy {

  // clientID: number;
  
  title: string;
  superUserEntity: User;
  recipeEntity: Recipe;
  isAdmin: boolean;
  editStatus: number;
  status = {
    'ownClient': 1,
    'notOwnClient': 2,
    'newContent': 3,
  };
  superUsers: any;
  // ingredients: Ingredient[] = [];
  // recipe = new Recipe({
  //   id: 0,
  //   ingredients: [],
  //   name: '',
  //   description: '',
  //   imagePath: '',
  // });

  // ingredient = new Ingredient({
  //   id: 0,
  //   recipeId: 0,
  //   name: '',
  //   amount: '',
  //   unitMeasure: ''
  // });

  constructor(
    private userService: UserService,
    private superUserService: SuperUserService,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) {
    super();
  }

  ngOnInit() {
    const data = this.route.snapshot.data;

    if (data.ownClient) {
      this.editStatus = this.status.ownClient;
      const userSubscr = this.userService.getUser().subscribe((user: User) => {
        this.superUserEntity = user;
        this.prepareRecipeObject(data);
      });
      this.addSubscription(userSubscr);
    }

    if (!data.ownContent && 'superUserID' in this.route.snapshot.params) {
      this.editStatus = this.status.notOwnClient;
      const userID = +this.route.snapshot.params.superUserID;
      const userSubscr = this.userService.loadUser(userID).subscribe((user: User) => {
        this.superUserEntity = user;
        this.prepareRecipeObject(data);
      });
      this.addSubscription(userSubscr);
    }

    this.isAdmin = this.userService.isAdmin();
    // this.id = this.route.snapshot.paramMap.get('id');
    // const subscr = this.route.params.subscribe((params: Params) => {
    //   this.id = +params.id;
    // });
    // this.addSubscription(subscr);
    // console.log(this.id);
    // this.getIngredients();
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

  prepareRecipeObject(data) {
    if (!data.newContent) {
      const recipeID = +this.route.snapshot.params.id;
      const recipeSubscr = this.recipeService.getRecipe(recipeID).subscribe((recipe: Recipe) => {
        console.log(recipe)
        this.recipeEntity = recipe;
        this.title = 'Edit ' + recipe.name;
        this.initSuperUserAC();
      });
      this.addSubscription(recipeSubscr);
    } else {
      this.editStatus = this.status.newContent;
      this.recipeEntity = new Recipe({});
      delete this.recipeEntity.id;
      this.recipeEntity.userId = this.superUserEntity.id;
      this.title = 'Create New Recipe';
      this.initSuperUserAC();
    }
  }

  onSubmit(form: NgForm) {
    if (this.editStatus === this.status.newContent) {
      const createSubscr = this.recipeService.createRecipe(this.recipeEntity).subscribe((response: boolean) => {
        createSubscr.unsubscribe();
        if (response) {
          this.router.navigate(['..'], {relativeTo: this.route});
        }
      });
      this.addSubscription(createSubscr);
    } else {
      const updateSubscr = this.recipeService.updateRecipe(this.recipeEntity, +this.recipeEntity.id).subscribe((response: boolean) => {
        updateSubscr.unsubscribe();
        if (response) {
          this.router.navigate(['../..'], {relativeTo: this.route});
        }
      });
      this.addSubscription(updateSubscr);
    }
  }
  // onAddIngredient() {
  //   (<FormArray>this.recipeForm.get('ingredients')).push(
  //     new FormGroup({
  //       'name': new FormControl(null, Validators.required),
  //       'amount': new FormControl(null, [
  //         Validators.required,
  //         Validators.pattern(/^[1-9]+[0-9]*$/)
  //       ]),
  //       'unitMeasure': new FormControl(null, Validators.required)
  //     })
  //   );
  // }

  // onDeleteIngredient(index: number) {
  //   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  // }
  // getIngredients(): void {
  //   const slsubscr = this.ingredientService.getIngredients()
  //     .subscribe((ingredientsList: Ingredient[]) => {
  //       this.recipe.ingredients = ingredientsList;
  //     });

  //   this.addSubscription(slsubscr);
  // }

  // private initForm() {
  //     const recipeIngredients = new FormArray([]);

  //     const recipe = this.recipeService.getRecipe(this.recipe.id).subscribe(value => {
  //       if (value) {
  //         recipeIngredients.setValue(value.ingredients);
  //       }
  //     });
  //     console.log(this.data)
  //     if (recipe['ingredients']) {
  //       for (const ingredient of recipeIngredients.value.ingredients) {
  //         recipeIngredients.push(
  //           new FormGroup({
  //             'name': new FormControl(ingredient.name, Validators.required),
  //             'amount': new FormControl(ingredient.amount, [
  //               Validators.required,
  //               Validators.pattern(/^[1-9]+[0-9]*$/)
  //             ]),
  //             'unitMeasure': new FormControl(ingredient.unitMeasure, Validators.required)
  //           })
  //         );
  //       }
  //     }
  //     this.recipeForm = new FormGroup({
  //       'ingredients': recipeIngredients
  //     });
  //     console.log(this.recipeForm)
  // }

  // onAddIngredient() {
  //   console.log(this.recipe.ingredients)
  //   this.recipe.ingredients.push(this.ingredient);
  //   console.log(this.recipe.ingredients)
  // }

  // onSubmit(form: NgForm) {
  //   console.log(form.valid)
  //   if (form.valid) {
  //     const recipeSubscr = this.recipeService.createRecipe(this.recipe).subscribe((response: boolean) => {
  //       console.log(response)
  //       recipeSubscr.unsubscribe();
  //       if (response) {
  //         this.router.navigate(['..'], {relativeTo: this.route});
  //       }
  //     });
  //     this.addSubscription(recipeSubscr);
  //   }
  // }

  ngOnDestroy() {
    this.dispose();
  }
}
