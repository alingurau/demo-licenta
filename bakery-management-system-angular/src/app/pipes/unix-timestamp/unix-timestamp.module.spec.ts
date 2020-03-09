import { UnixTimestampModule } from './unix-timestamp.module';

describe('UnixTimestampModule', () => {
  let unixTimestampModule: UnixTimestampModule;

  beforeEach(() => {
    unixTimestampModule = new UnixTimestampModule();
  });

  it('should create an instance', () => {
    expect(unixTimestampModule).toBeTruthy();
  });
});
