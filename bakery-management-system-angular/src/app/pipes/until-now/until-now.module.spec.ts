import { UntilNowModule } from './until-now.module';

describe('UntilNowModule', () => {
  let untilNowModule: UntilNowModule;

  beforeEach(() => {
    untilNowModule = new UntilNowModule();
  });

  it('should create an instance', () => {
    expect(untilNowModule).toBeTruthy();
  });
});
