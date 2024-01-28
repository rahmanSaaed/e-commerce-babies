import { TestBed } from '@angular/core/testing';

import { ShippingGuard } from './shipping.guard';

describe('ShippingGuard', () => {
  let guard: ShippingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShippingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
