import { ModalConfirmationModule } from './confirmation.module';

describe('ConfirmationModule', () => {
  let confirmationModule: ModalConfirmationModule;

  beforeEach(() => {
    confirmationModule = new ModalConfirmationModule();
  });

  it('should create an instance', () => {
    expect(confirmationModule).toBeTruthy();
  });
});
