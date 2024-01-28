import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferAAfriendComponent } from './refer-a-afriend.component';

describe('ReferAAfriendComponent', () => {
  let component: ReferAAfriendComponent;
  let fixture: ComponentFixture<ReferAAfriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferAAfriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferAAfriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
