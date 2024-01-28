import { TestBed } from '@angular/core/testing';

import { AccInfoService } from './acc-info.service';

describe('AccInfoService', () => {
  let service: AccInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
