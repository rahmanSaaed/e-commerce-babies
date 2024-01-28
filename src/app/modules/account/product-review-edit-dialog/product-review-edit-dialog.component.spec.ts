import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewEditDialogComponent } from './product-review-edit-dialog.component';

describe('ProductReviewEditDialogComponent', () => {
  let component: ProductReviewEditDialogComponent;
  let fixture: ComponentFixture<ProductReviewEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductReviewEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
