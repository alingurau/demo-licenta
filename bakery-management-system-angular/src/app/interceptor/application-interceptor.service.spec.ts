import { TestBed, inject } from '@angular/core/testing';

import { ApplicationInterceptorService } from './application-interceptor.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApplicationInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ApplicationInterceptorService]
    });
  });

  it('should be created', inject([ApplicationInterceptorService], (service: ApplicationInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
