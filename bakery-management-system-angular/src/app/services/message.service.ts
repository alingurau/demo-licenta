import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages = [];

  constructor() {  }

  showMessage(msg: string, type: string) {
    this.messages.push({
      msg: msg,
      type: type
    });

    setTimeout(() => {
      this.removeMessage(0);
    }, 5000);
  }

  removeMessage(index) {
    this.messages.splice(index, 1);
  }
}
