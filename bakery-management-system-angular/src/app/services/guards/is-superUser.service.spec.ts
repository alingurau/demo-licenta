import { TestBed, inject } from '@angular/core/testing';

import { IsSuperUserGuard } from './is-superUser.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('IsSalesmanGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [IsSuperUserGuard]
    });
  });

  it('should be created', inject([IsSuperUserGuard], (service: IsSuperUserGuard) => {
    expect(service).toBeTruthy();
  }));
});
