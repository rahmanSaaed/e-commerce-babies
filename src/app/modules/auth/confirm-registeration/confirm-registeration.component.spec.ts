import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRegisterationComponent } from './confirm-registeration.component';

describe('ConfirmRegisterationComponent', () => {
  let component: ConfirmRegisterationComponent;
  let fixture: ComponentFixture<ConfirmRegisterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRegisterationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
