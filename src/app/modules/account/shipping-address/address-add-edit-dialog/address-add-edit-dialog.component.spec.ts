import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressAddEditDialogComponent } from './address-add-edit-dialog.component';

describe('AddressAddEditDialogComponent', () => {
  let component: AddressAddEditDialogComponent;
  let fixture: ComponentFixture<AddressAddEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressAddEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
