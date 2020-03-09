import { LoginLayoutModule } from './login.module';

describe('LoginModule', () => {
  let loginModule: LoginLayoutModule;

  beforeEach(() => {
    loginModule = new LoginLayoutModule();
  });

  it('should create an instance', () => {
    expect(loginModule).toBeTruthy();
  });
});
