import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPaymentMethodsComponent } from './shipping-payment-methods.component';

describe('ShippingPaymentMethodsComponent', () => {
  let component: ShippingPaymentMethodsComponent;
  let fixture: ComponentFixture<ShippingPaymentMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingPaymentMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
