import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShippingAddressService } from '@resources/services/accounts/shipping-address/shipping-address.service';
import { HandleErrorsService } from '@resources/services/handle-errors/handle-errors.service';
import { ToastrService } from 'ngx-toastr';
import { AddressAddEditDialogComponent } from 'src/app/modules/account/shipping-address/address-add-edit-dialog/address-add-edit-dialog.component';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent implements OnInit {
  addressTypes: [];
  updateAddressForm = this.fb.group({
    address: ['', Validators.required],
    // zoneId: [''],
    cityId: ['', Validators.required],
    areaId: ['', Validators.required],
    type: ['', Validators.required],
    deliveryNote: ['']

  });

  status : any = "47";
  // status_values: any = ["45", "46", "47"];

  // addressTypes = [
  //   { value: 'WORK', viewValue: 'Work' },
  //   { value: 'HOME', viewValue: 'Home' },
  // ];
  cities: any;
  sellectedAreas: any;
  // areaIdValue: any;
  // cityIdValue: any;
  // zoneId: any;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private shippingAddressService: ShippingAddressService,
    private dialogRef: MatDialogRef<AddressAddEditDialogComponent>,
    private handleErrorsService: HandleErrorsService
  ) {}

  ngOnInit(): void {
    this.addressTypesFunc();
    this.Allcities();
    if (this.data) {
      this.patchAdress(this.data);
    }

  }


  Allcities() {
    this.shippingAddressService
    .getCities()
    .subscribe((res: any) => {
      if (res) {
        this.cities = res.data.cities;
        console.log('cities',  this.cities );
        // this.toastr.success('Success');
        // this.dialogRef.close({ data: res.data });
      }
    });
  }

  addressTypesFunc() {
    console.log('addressTypes');
    this.shippingAddressService.getAdressType().subscribe((res: any) => {
      console.log('addressTypes', res);
      this.addressTypes = res?.data?.addressTypes;
    })
  }

  changeCity(cityId) {
    console.log('area', cityId)
    // this.zoneId = undefined;
    if (cityId && this.cities?.length > 0) {
    const city = this.cities.filter(el => el.cityId == cityId);
    console.log('city', city);
    this.sellectedAreas = city[0].areas;
    // this.zoneId = city[0].zoneId;
    // this.updateAddressForm.value.zoneId = city[0].zoneId;

    }

    console.log('updateAddressForm', this.updateAddressForm.value)
    console.log('sellectedAreas', this.sellectedAreas)
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
    console.log('updateAddressForm', this.updateAddressForm.value)
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

    // this.updateAddressForm.value.zoneId =  this.zoneId;
    console.log('updateAddressForm', this.updateAddressForm.value)
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
    }, error => {
      // this.toastr.error(err)
      this.handleErrorsService.handleError(error);
    });
  }

  patchAdress(data) {
    console.log('patchAdress', data);
    if (this.data?.dataKey?.addressId) {
      this.updateAddressForm.value.addressId = this.data?.dataKey?.addressId;
      this.updateAddressForm.patchValue(data.dataKey);
      // this.areaIdValue = data.dataKey.area.areaId;
      // this.cityIdValue = data.dataKey.city.cityId;
      // console.log('cityIdValue', typeof this.cityIdValue);
    }
  }

  get address() {
    return this.updateAddressForm.get('address');
  }

  get cityId() {
    return this.updateAddressForm.get('cityId');
  }

  get areaId() {
    return this.updateAddressForm.get('areaId');
  }

  get type() {
    return this.updateAddressForm.get('type');
  }

  get deliveryNote() {
    return this.updateAddressForm.get('deliveryNote');
  }
}


