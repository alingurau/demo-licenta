export class DummyUsers {

  private defaultUsers = [
    {
      id: 1,
      username: 'pr@mail.com',
      password: 'test',
      firstName: 'Peter',
      lastName: 'Roberts',
      modified: 1526128011,
      created: 1520771233,
      role: 'ADMIN'
    },
    {
      id: 2,
      username: 'mail@mail.com',
      password: 'test',
      firstName: 'Jhon',
      lastName: 'Smith',
      modified: 1526128011,
      created: 1520771233,
      role: 'SUPERUSER'
    }
  ];


  users = [];

  constructor() {
    if (localStorage.getItem('dummyUsers')) {
      // Loaded users from localStorage
      const dummyData = localStorage.getItem('dummyUsers');
      this.users = JSON.parse(dummyData);
    } else {
      this.users = this.defaultUsers;
      localStorage.setItem('dummyUsers', JSON.stringify(this.users));
    }
  }

  addUser(data: any, password: any) {
    if (password.newPass !== password.newPass2) {
      return 3;
    }

    const lastUser = this.users.pop();
    this.users.push(lastUser);
    data.id = lastUser.id + 1;
    data.password = password.newPass;
    data.created = Date.now();
    data.modified = Date.now();
    data.role = 'SALES';

    this.users.push(data);
    localStorage.setItem('dummyUsers', JSON.stringify(this.users));

    return 1;
  }

  editUser(id: number, data: any, password?: any) {
    const user = this.users.filter((usr) => usr.id === id).pop();

    if (!user) {
      return 4;
    }

    if (password) {
      if ('currentPass' in password) {
        if (user.password !== password.currentPass) {
          return 2;
        }
      }

      if (password.newPass !== password.newPass2) {
        return 3;
      }

      data.password = password.newPass;
    }

    for (const prop in data) {
      user[prop] = data[prop];
    }

    localStorage.setItem('dummyUsers', JSON.stringify(this.users));

    return 1;
  }
}
