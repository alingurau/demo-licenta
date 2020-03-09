export class User {
  id = 0;
  username = '';
  firstName = '';
  lastName = '';
  created = 0;
  modified = 0;
  role = '';
  anonym = false;
  position = 0;

  constructor(data: any) {
    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
          this[prop] = data[prop];
      }
    }
  }
}
