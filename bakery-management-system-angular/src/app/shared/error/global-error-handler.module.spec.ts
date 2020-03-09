import { GlobalErrorHandlerModule } from './global-error-handler.module';

describe('GlobalErrorHandlerModule', () => {
  let globalErrorHandlerModule: GlobalErrorHandlerModule;

  beforeEach(() => {
    globalErrorHandlerModule = new GlobalErrorHandlerModule();
  });

  it('should create an instance', () => {
    expect(globalErrorHandlerModule).toBeTruthy();
  });
});
