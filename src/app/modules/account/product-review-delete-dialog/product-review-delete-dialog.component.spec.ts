import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewDeleteDialogComponent } from './product-review-delete-dialog.component';

describe('ProductReviewDeleteDialogComponent', () => {
  let component: ProductReviewDeleteDialogComponent;
  let fixture: ComponentFixture<ProductReviewDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductReviewDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
