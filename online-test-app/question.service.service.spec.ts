import { TestBed } from '@angular/core/testing';

import { Question.ServiceService } from './question.service.service';

describe('Question.ServiceService', () => {
  let service: Question.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Question.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
