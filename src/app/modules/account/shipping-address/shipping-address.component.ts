import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShippingAddressService } from '@resources/services/accounts/shipping-address/shipping-address.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AddressDialogComponent } from '../../shipping/shipping-details/address-dialog/address-dialog.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent implements OnInit {

  address: any[] = [];

  constructor(private dialog:MatDialog,
    private shippingAddressService: ShippingAddressService,
    private toastr: ToastrService,
    private translateService: TranslateService
    ) { }


  ngOnInit(): void {
    this.getAddress();
  }

  getAddress() {
    this.shippingAddressService.getAdress().subscribe((res: any) => {
      console.log(res);
      this.address = [...res.data.getUserAddresses];
    })
  }

  openAddEditAddress(data?) {
    console.log('openAddEditAddress', data);
		const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '700px',
      data: {
        dataKey: data
      }
		  });

		  dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.getAddress();
		  });
  }

  deleteAddresses(id, index) {
    const variables = {
      deleteAddressInput: {addressId: id
    }}
    this.shippingAddressService.deleteAddress(variables).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.toastr.success('Success');
        this.address.splice(index, 1)
      }
    })
  }


  deleteItem(id, index) {
    console.log('id', id);
    console.log('index', index);


    Swal.fire({
      title: this.translateService.instant('AreYouSure?'),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: this.translateService.instant('Delete'),
      denyButtonText: this.translateService.instant('DontDelete'),
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAddresses(id, index);
      } else if (result.isDenied) {
      }
    });
  }

}
