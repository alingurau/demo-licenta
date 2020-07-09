export class Client {
  id = 0;
  userId: any;
  firstName = '';
  lastName = '';
  phone = '';
  company = '';
  address = '';
  position = 0;

  constructor(data: any) {
    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        this[prop] = data[prop];
      }
    }
  }
}
