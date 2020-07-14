import { Component, OnInit, Input, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { SelfUnsubscribe } from 'src/app/shared/self-unsubscribe';
import { FormGroup } from '@angular/forms';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent extends SelfUnsubscribe implements OnInit {

  // recipe: Observable<Recipe>;
  id: number;

  // @Input() recipe: Observable<Recipe>;
  // @Input() id: number;

  recipeEntity = {} as Recipe;
  ingredients = [{
    'name': 'oua',
    'amount': 4,
    'unitMeasure': 'buc'
  },
  {
    'name': 'ulei',
    'amount': 25,
    'unitMeasure': 'ml'
  },
  {
    'name': 'zahar',
    'amount': 20,
    'unitMeasure': 'g'
  },
  {
    'name': 'faina',
    'amount': 200,
    'unitMeasure': 'g'
  },
  {
    'name': 'apa rece',
    'amount': 50,
    'unitMeasure': 'ml'
  },
  {
    'name': 'frisca',
    'amount': 300,
    'unitMeasure': 'ml'
  },
  {
    'name': 'ciocolata',
    'amount': 300,
    'unitMeasure': 'gr'
  }];

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
   }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );
    this.getRecipe();
  }

  getRecipe() {
    const recipeID = this.id;
      const recipeSubscr = this.recipeService.getRecipe(recipeID).subscribe((recipe: Recipe) => {
        this.recipeEntity = recipe;
      });
      this.addSubscription(recipeSubscr);
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

}
