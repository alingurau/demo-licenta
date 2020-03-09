import { TestBed, inject } from '@angular/core/testing';

import { SuperUserService } from './superUser.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SalesmanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [SuperUserService]
    });
  });

  it('should be created', inject([SuperUserService], (service: SuperUserService) => {
    expect(service).toBeTruthy();
  }));
});
