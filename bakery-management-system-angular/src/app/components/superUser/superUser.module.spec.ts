import { SuperUserModule } from './superUser.module';

describe('SuperUserModule', () => {
  let superUserModule: SuperUserModule;

  beforeEach(() => {
    superUserModule = new SuperUserModule();
  });

  it('should create an instance', () => {
    expect(superUserModule).toBeTruthy();
  });
});
