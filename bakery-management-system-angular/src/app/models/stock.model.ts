export class Stock {
    id = 0;
    userId: any;
    code = '';
    product = '';
    quantity = '';
    unitMeasure = '';
    position = 0;

    constructor(data: any) {
      for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
          this[prop] = data[prop];
        }
      }
    }
  }