export class Order {
    id = 0;
    clientId = 0;
    name = '';
    description = '';
    start: any;
    end: any;
    position = 0;

    constructor(data: any) {
        for (const prop in data) {
          if (data.hasOwnProperty(prop)) {
            this[prop] = data[prop];
          }
        }
      }
}
