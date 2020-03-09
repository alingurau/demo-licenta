import { JsTimestampModule } from './js-timestamp.module';

describe('JsTimestampModule', () => {
  let jsTimestampModule: JsTimestampModule;

  beforeEach(() => {
    jsTimestampModule = new JsTimestampModule();
  });

  it('should create an instance', () => {
    expect(jsTimestampModule).toBeTruthy();
  });
});
