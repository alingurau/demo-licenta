import { TestBed, inject } from '@angular/core/testing';

import { RequestManager } from './request-manager.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RequestManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RequestManager
      ]
    });
  });

  it('should be created', inject([RequestManager], (service: RequestManager) => {
    expect(service).toBeTruthy();
  }));
});
