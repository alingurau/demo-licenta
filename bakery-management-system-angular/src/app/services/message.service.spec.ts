import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [MessageService]
    });
  });

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));
});
