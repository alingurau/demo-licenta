import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IsSuperUserGuard } from './is-superUser.service';

describe('IsSuperUserGuard', () => {
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
