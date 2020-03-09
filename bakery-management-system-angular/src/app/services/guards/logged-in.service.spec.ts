import { TestBed, inject } from '@angular/core/testing';

import { LoggedInGuard } from './logged-in.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [LoggedInGuard]
    });
  });

  it('should be created', inject([LoggedInGuard], (service: LoggedInGuard) => {
    expect(service).toBeTruthy();
  }));
});
