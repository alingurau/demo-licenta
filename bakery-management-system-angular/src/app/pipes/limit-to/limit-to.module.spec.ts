import { LimitToModule } from './limit-to.module';

describe('LimitToModule', () => {
  let limitToModule: LimitToModule;

  beforeEach(() => {
    limitToModule = new LimitToModule();
  });

  it('should create an instance', () => {
    expect(limitToModule).toBeTruthy();
  });
});
