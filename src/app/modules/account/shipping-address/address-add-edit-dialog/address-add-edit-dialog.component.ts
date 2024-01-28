import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  GraphFunctions,
  Types,
  VariablesInput,
} from '@resources/graph-functions/graph-functions';
import { Returns } from '@resources/returns/returns';
import { ShippingAddressService } from '@resources/services/accounts/shipping-address/shipping-address.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-add-edit-dialog',
  templateUrl: './address-add-edit-dialog.component.html',
  styleUrls: ['./address-add-edit-dialog.component.scss'],
})
export class AddressAddEditDialogComponent implements OnInit {
  updateAddressForm = this.fb.group({
    address: ['', Validators.required],
    city: ['', Validators.required],
    province: ['', Validators.required],
    type: ['', Validators.required]
  });


  addressTypes = [
    { value: 'WORK', viewValue: 'Work' },
    { value: 'HOME', viewValue: 'Home' },
  ];



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private shippingAddressService: ShippingAddressService,
    private dialogRef: MatDialogRef<AddressAddEditDialogComponent>
  ) {}

  ngOnInit(): void {
    console.log('data',this.data)
    if (this.data) {
      this.patchAdress(this.data);
    }

  }

  updateAdress() {
    if (this.data?.dataKey?.addressId) {
      this.updateAddressForm.value.addressId = this.data?.dataKey?.addressId;
      this.updateAddress();
    } else {
      delete this.updateAddressForm.value.addressId;
      this.addAddress();
    }
  }


  updateAddress() {
    const variables = {
      updateAddressInput: this.updateAddressForm.value,
    }
    this.shippingAddressService
    .updateAdress(variables)
    .subscribe((res: any) => {
      if (res) {
        this.toastr.success('Success');
        this.dialogRef.close({ data: res.data });
      }
    });
  }

  addAddress() {
    const variables = {
      createAddressInput: this.updateAddressForm.value,
    }
    this.shippingAddressService
    .addAdress(variables)
    .subscribe((res: any) => {
      if (res) {
        this.toastr.success('Success');
        this.dialogRef.close({ data: res.data });
      }
    });
  }

  patchAdress(data) {
    if (this.data?.dataKey?.addressId) {
      this.updateAddressForm.value.addressId = this.data?.dataKey?.addressId;
      this.updateAddressForm.patchValue(data.dataKey);
    }
  }

  get address() {
    return this.updateAddressForm.get('address');
  }

  get city() {
    return this.updateAddressForm.get('city');
  }

  get province() {
    return this.updateAddressForm.get('province');
  }

  get type() {
    return this.updateAddressForm.get('type');
  }
}
