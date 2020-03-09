export class DummyClients {
  defaultClients = [
    {
      id: 1,
      userId: 2,
      email: 'cm1@mail.com',
      firstName: 'Ion',
      lastName: 'Stefan',
      phone: '0711987456',
      company: 'Test',
      address: 'str Mihai Eminescu nr 12',
      state: 'Oradea',
      postCode: '471001',
      country: 'Romania',
      // modified: 1526128011,
      // created: 1520771233,
    },
    {
      id: 2,
      userId: 2,
      email: 'cm2@mail.com',
      firstName: 'Popa',
      lastName: 'Sergiu',
      phone: '0711987456',
      company: 'Test 2',
      address: 'str Alexandriei nr 85',
      state: 'Oradea',
      postCode: '471001',
      country: 'Romania',
      // modified: 1526128011,
      // created: 1520771233,
    }
  ];

  clients = [];

  constructor() {
    if (localStorage.getItem('dummyClients')) {
      // Loaded users from localStorage
      const dummyData = localStorage.getItem('dummyClients');
      this.clients = JSON.parse(dummyData);
    } else {
      this.clients = this.defaultClients;
      localStorage.setItem('dummyClients', JSON.stringify(this.clients));
    }
  }

  createClient(client: any) {
    client.id = this.clients[this.clients.length - 1].id + 1;
    this.clients.push(client);
    localStorage.setItem('dummyClients', JSON.stringify(this.clients));
  }

  updateClient(newClient: any, id: number) {
    for (const client of this.clients) {
      if (client.id === id) {
        newClient.userId = +newClient.userId;
        const index = this.clients.indexOf(client);
        this.clients[index] = newClient;
        localStorage.setItem('dummyClients', JSON.stringify(this.clients));
        break;
      }
    }
  }
}
