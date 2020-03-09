import { TestBed, inject } from '@angular/core/testing';

import { IsAdminGuard } from './is-admin.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IsAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [IsAdminGuard]
    });
  });

  it('should be created', inject([IsAdminGuard], (service: IsAdminGuard) => {
    expect(service).toBeTruthy();
  }));
});
