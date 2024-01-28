import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhishlistItemComponent } from './whishlist-item.component';

describe('WhishlistItemComponent', () => {
  let component: WhishlistItemComponent;
  let fixture: ComponentFixture<WhishlistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhishlistItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhishlistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
