import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ReceiptDialog } from './receipt-dialog.component';

describe('UpdateEmailDialogComponent', () => {
  let component: ReceiptDialog;
  let fixture: ComponentFixture<ReceiptDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
