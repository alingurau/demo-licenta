import { TestBed, inject } from '@angular/core/testing';

import { IsAnonymousGuard } from './is-anonymous.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IsAnonymousGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [IsAnonymousGuard]
    });
  });

  it('should be created', inject([IsAnonymousGuard], (service: IsAnonymousGuard) => {
    expect(service).toBeTruthy();
  }));
});
