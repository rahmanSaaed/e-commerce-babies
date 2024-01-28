import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDatailComponent } from './order-datail.component';

describe('OrderDatailComponent', () => {
  let component: OrderDatailComponent;
  let fixture: ComponentFixture<OrderDatailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDatailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
