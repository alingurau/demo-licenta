import { AppLayoutModule } from './app.module';

describe('AppModule', () => {
  let appModule: AppLayoutModule;

  beforeEach(() => {
    appModule = new AppLayoutModule();
  });

  it('should create an instance', () => {
    expect(appModule).toBeTruthy();
  });
});
