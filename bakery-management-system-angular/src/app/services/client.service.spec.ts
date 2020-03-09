import { TestBed, inject } from '@angular/core/testing';

import { ClientService } from './client.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ClientService]
    });
  });

  it('should be created', inject([ClientService], (service: ClientService) => {
    expect(service).toBeTruthy();
  }));
});
