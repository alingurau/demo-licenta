import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { MessageService } from '../../services/message.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private messageService: MessageService,
    private injector: Injector
  ) { }

  handleError(error) {
    this.messageService.showMessage(error, 'danger');
    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    throw error;
  }
}
