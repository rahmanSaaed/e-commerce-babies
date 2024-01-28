import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MumezSubscriptionComponent } from './mumez-subscription.component';

describe('MumezSubscriptionComponent', () => {
  let component: MumezSubscriptionComponent;
  let fixture: ComponentFixture<MumezSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MumezSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MumezSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
