export class Ingredient {
    id: 0;
    recipeId: 0;
    name: string;
    amount: number;
    unitMeasure: string;
    position: number;

    constructor(data: any) {
      for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
          this[prop] = data[prop];
        }
      }
    }
}