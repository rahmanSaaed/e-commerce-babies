import { SpinnerService } from './../../@shared/services/spinner.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShippingAddressService } from '@resources/services/accounts/shipping-address/shipping-address.service';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';
import { CartService } from '@resources/services/cart/cart.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HandleErrorsService } from '@resources/services/handle-errors/handle-errors.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.scss']
})
export class ShippingDetailsComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();


  address: any[] = [];
  dateSellected: any;
  cartProductsWeigh: number;
  pickUpLocationIds: any[];
  cartDetail: any[];
  totalCartPrice: number;
  totalTax: number;
  currency: any;
  shippingAmmountTotal: any;
  uniquePickUpLocationIds: any[];
  validatedPromo: any;
  totalCartPriceAfterDisocunt: number;
  amountDeductedByPromo: any;
  promoCode: any;
  constructor(private dialog: MatDialog,
    private shippingAddressService: ShippingAddressService,
    private spinner: SpinnerService,
    private cartService: CartService,
    private toaster: ToastrService,
    private handleErrorsService: HandleErrorsService,
    private translateService: TranslateService
    ) {
      this.currency = JSON.parse((sessionStorage.getItem('currency')))[0];
    }

  ngOnInit(): void {
    this.spinner.show();
    this.getAddress();
    this.checkCartByToken();
  }


  openAddAddress(data?) {
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


  getAddress() {
    this.shippingAddressService.getAdress().subscribe((res: any) => {
      console.log('getAddress', res);
      this.spinner.hide();
      this.address = [...res.data.getUserAddresses];
      if(this.address.length > 0) {
      } this.dateSellected = this.address[0];

        this.sellectAddress(this.dateSellected = this.address[0])
    }, error => {
      this.handleErrorsService.handleError(error);
      if(this.address.length > 0) {
        this.dateSellected = this.address[0];
        this.getShippingFees();
      }
    })
  }


  checkCartByToken() {
    console.log(localStorage.getItem('AUTH_TOKEN'));
    if (localStorage.getItem('AUTH_TOKEN')) {
      console.log('checkCartByToken');

      this.cartService.getCartByer().subscribe((res: any)  => {
        console.log('checkCartByToken', res);
        console.log('cart data', res);
        this.validatePromoCode();
        if (res?.data?.buyerCart) {

          this.cartDetail = [...res?.data?.buyerCart?.cartDetails];
          this.totalCartPrice = this.cartService.countTotal(this.cartDetail);
          this.totalTax = this.cartService.countVat(this.cartDetail);
          this.cartWeigh(this.cartDetail);
          console.log('totalCartPrice', this.totalCartPrice)
          console.log('totalTax', this.totalTax)
        }
      }, error => {
        this.handleErrorsService.handleError(error);
      })

    }
  }

  cartWeigh(cartDetails) {
    this.cartProductsWeigh = 0;
    this.pickUpLocationIds = [];
    this.uniquePickUpLocationIds = [];
    cartDetails.forEach(el => {
      if ( !el?.product?.freeShipping) {
        this.cartProductsWeigh =  (el?.qty  * el?.product?.weightInKilo)  + this.cartProductsWeigh;
        if (el?.product?.pickUpLocationId ) {
        this.pickUpLocationIds.push(el?.product?.pickUpLocationId);
      }

      }
    });
    console.log('cartWeigh', this.cartProductsWeigh);
    console.log('pickUpLocationIds', this.pickUpLocationIds);
    this.uniquePickUpLocationIds = [...new Set(this.pickUpLocationIds)];
    console.log('uniquePickUpLocationIds', this.uniquePickUpLocationIds);
  }

  getShippingFees() {
    const variables = {
      shippingFeesLookupInput: {
        zoneId: this.dateSellected.zoneId,
        pickUpLocations: this.uniquePickUpLocationIds?.length,
        weight: this.cartProductsWeigh
      }
    }
    this.cartService.cartShippingFees(variables).subscribe((res: any) => {
      console.log('getShippingFees', res);
      this.shippingAmmountTotal = res.data.shippingPriceLookUp.shippingFees
    }, error => {
      this.handleErrorsService.handleError(error);
    })
  }


  sellectAddress(date) {
    console.log('sellectAddress', date);
    this.dateSellected = date;
    this.getShippingFees();
  }

  nextStep(step) {
    this.emmitNextStep(step);
  }

  emmitNextStep(value: string) {
    const object = {
      ...this.dateSellected,
      step: value
    }
    console.log(object);
    this.newItemEvent.emit(object);
  }


  validatePromoCode() {
    if (localStorage.getItem('PROMO-CODE') || this.promoCode) {
      const variables = {
        promoCodeInput: {
        code: this.promoCode ? this.promoCode : localStorage.getItem('PROMO-CODE')
        }
      };

      this.cartService
        .validateCode(variables)
        .subscribe((res: any) => {
          if (res) {
            console.log('validatePromoCode', res);
            localStorage.setItem('PROMO-CODE',  res?.data?.promoCodeByCode?.code);
            this.validatedPromo = res?.data?.promoCodeByCode;
            this.handleValidPromo()
          }
        }, error => {
          this.toaster.error(error);
          this.clearPromo();
        });
    }
  }

  deletePromo(id) {
    Swal.fire({
      // title: 'Are You Sure ?',
      title: this.translateService.instant('AreYouSure?'),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: this.translateService.instant('Delete'),
      denyButtonText: this.translateService.instant('DontDelete'),
    }).then((result) => {
      if (result.isConfirmed) {
        this.clearPromo();
      } else if (result.isDenied) {
      }
    });
  }

  handleValidPromo() {
    if (this.validatedPromo?.type == 'AMOUNT') {
      this.totalCartPriceAfterDisocunt = this.totalCartPrice - this.validatedPromo?.value;
       this.amountDeductedByPromo = this.validatedPromo?.value;
    } else if (this.validatedPromo.type == 'PERCENTAGE') {
      this.totalCartPriceAfterDisocunt = this.totalCartPrice - ((this.validatedPromo?.value/100) * this.totalCartPrice);
      this.amountDeductedByPromo = ((this.validatedPromo?.value/100) * this.totalCartPrice);
    }
    this.amountDeductedByPromo = this.amountDeductedByPromo;
  }

  clearPromo() {
    localStorage.removeItem('PROMO-CODE');
    this.amountDeductedByPromo = undefined;
    this.validatedPromo = undefined;
    this.totalCartPriceAfterDisocunt = undefined;
    this.promoCode = undefined;
  }

}
