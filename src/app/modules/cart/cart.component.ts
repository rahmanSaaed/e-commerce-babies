import { SpinnerService } from './../@shared/services/spinner.service';
import { LocalStorageService } from './../@resources/services/local-storage/local-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@resources/services/cart/cart.service';
import { SharingDataService } from '@resources/services/sharing-data/sharing-data.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Utils } from '@shared/utils/utils';
import { TranslateService } from '@ngx-translate/core';
// import { PromoCodeTypes } from '@core/enums/enums';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartDetail: any[];
  productQuantity: any;
  updatedCart: any[];

  private getCartEventSubscription: Subscription;
  totalCartPrice: number;
  // totalTax: number;
  crossSelling: any[] = [];
  shippingAmmountTotal: number;
  currency: any;
  cartProductsWeigh: any;
  pickUpLocationIds: any[];
  promoCode: string;
  util = new Utils();
  // promoType =  PromoCodeTypes;

  validatedPromo: any;

  PromoCodeTypes
  amountDeductedByPromo: any;
  totalCartPriceAfterDisocunt: number;
  constructor(
    private cartService: CartService,
    private toaster: ToastrService,
    private route: Router,
    private sharingDataService: SharingDataService,
    private locatStorage: LocalStorageService,
    private spinner: SpinnerService,
    private translateService: TranslateService
  ) {
    this.currency = JSON.parse((sessionStorage.getItem('currency')))[0];
  }

  ngOnInit(): void {
    this.spinner.show();
    this.sharingDataServicCartItems();
    this.getProductsFromCart();
    // this.validatePromoCode();
  }

  getProductsFromCart() {
    if (localStorage.getItem('AUTH_TOKEN')) {
      this.checkCartByToken();
    } else if (localStorage.getItem('cartId')  || localStorage.getItem('cartId_Guest')) {
      this.getFromCart();
    }
  }

  getFromCart() {
    if ( localStorage.getItem('cartId')  || localStorage.getItem('cartId_Guest')) {


    const variables = {
      getCartInput: {
      cartId: localStorage.getItem('cartId') ? localStorage.getItem('cartId') : localStorage.getItem('cartId_Guest'),
      }
    };
    this.getCartEventSubscription = this.cartService
      .getCart(variables)
      .subscribe(({ data, loading }: any) => {
        console.log('cart data', data);
        this.locatStorage.set('CART_LENGTH',data.cart.cartDetails)
        this.cartDetail = [...data.cart.cartDetails];
        this.totalCartPrice = this.cartService.countTotal(this.cartDetail);
        // this.totalTax = this.cartService.countVat(this.cartDetail);
        this.sendCartItemsToCartNotifications(this.cartDetail);
        this.validatePromoCode();

        // this.shippingAmmountTotal = this.cartService.shippingAmmount(this.cartDetail);
        // this.cartWeigh(this.cartDetail)
      });
  }}

  deleteItem(id) {
    // 'Are You Sure ? '
    Swal.fire({
      title: this.translateService.instant('AreYouSure?'),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: this.translateService.instant('Delete'),
      denyButtonText: this.translateService.instant('DontDelete'),
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct(id);
      } else if (result.isDenied) {
      }
    });
  }



  deleteProduct(id) {
    const variables = {
      deleteCartDetailInput: {
        cartDetailId: id
      }
    };
    this.cartService.deleteProductFromCart(variables).subscribe((res: any) => {
      if (res) {
        this.updateCartDataAfterDelete(id);
        // this.sendCartItemsToCartNotifications(res);
        // this.getFromCart();
      }
      this.toaster.success(`Deleted Successfully`);
      // this.deleteCrossSelling(id);
    }, error => {
      this.toaster.error(error)
    });
  }

  deleteCrossSelling(id) {
    console.log('crossSelling', this.crossSelling)
    const newCrossSelling = this.crossSelling.filter(el => el?.productId != id);
    console.log('newCrossSelling', newCrossSelling)
  }

  updateCartDataAfterDelete(id) {
    this.updatedCart = [];
    this.cartDetail.forEach((el) => {
      if (el.cartDetailId != id) {
        this.updatedCart.push(el);
      }
    });
    this.cartDetail = [];
    this.cartDetail = [...this.updatedCart];
    this.totalCartPrice = this.cartService.countTotal(this.cartDetail);
    // this.totalTax = this.cartService.countVat(this.cartDetail);
    this.locatStorage.set('CART_LENGTH',this.cartDetail.length)
    this.sendCartItemsToCartNotifications(this.cartDetail);
    // this.shippingAmmountTotal = this.cartService.shippingAmmount(this.cartDetail);
    // this.cartWeigh(this.cartDetail)
  }

  gotoProductDetail(id, name) {
    this.route.navigate(['/product', this.util.createSlug(name, id)]);
  }

  updateCartDetail(item, parameter) {
    this.productQuantity = item.qty;
    if (
      parameter === 'plus' &&
      item.qty !== item.product.qty &&
      item.qty < item.product.qty
    ) {
      this.productQuantity++;
      this.updateProductQuantityInRunTime(item.cartDetailId);
      this.updateProductQuantity(this.productQuantity, item);
    } else if (parameter === 'minus' && item.qty > 1) {
      this.productQuantity--;
      this.updateProductQuantityInRunTime(item.cartDetailId);
      this.updateProductQuantity(this.productQuantity, item);
    } else if (parameter === 'minus' && item.qty === 1) {
      this.deleteItem(item.cartDetailId);
    } else if (parameter === 'plus' && item.qty == item.product.qty) {
      this.toaster.error(`no enough quantity for ${item?.product?.name || item?.product?.name}`);
    }

  }

  updateProductQuantityInRunTime(id) {
    this.cartDetail.forEach((el, index) => {
      if (el.cartDetailId === id) {
        const NewElemnt = { ...el };
        NewElemnt.qty = this.productQuantity;

        this.cartDetail[index] = NewElemnt;
      }
    });
    this.cartDetail = [...this.cartDetail];
    this.totalCartPrice = this.cartService.countTotal(this.cartDetail);
    // this.totalTax = this.cartService.countVat(this.cartDetail);
    this.sendCartItemsToCartNotifications(this.cartDetail);
    // this.shippingAmmountTotal = this.cartService.shippingAmmount(this.cartDetail);
    // this.cartWeigh(this.cartDetail)
  }

  updateProductQuantity(productQuantity, item) {
    const variables = {
      updateCartDetailsInput: {
        cartDetailId: item.cartDetailId,
        productId: item.productId,
        qty: productQuantity,
      },
    };

    this.cartService
      .updateProductCartQuantity(variables)
      .subscribe((res: any) => {
        if (res) {
          // this.sendCartItemsToCartNotifications(res);
          // this.getFromCart();
        }
      }, error => {
        this.toaster.error(error)
      });
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
      console.log('handleValidPromoPERCENTAGE', (this.validatedPromo?.value/100) * this.totalCartPrice)
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


  sendCartItemsToCartNotifications(res) {
    this.sharingDataService.nextCount(res)
  }


  checkCartByToken() {
    if (localStorage.getItem('AUTH_TOKEN')) {
      this.cartService.getCartByer().subscribe((res: any)  => {
        console.log('checkCartByToken', res);
        console.log('cart data', res);
        if (res?.data?.buyerCart) {
          this.sendCartItemsToCartNotifications(res?.data?.buyerCart?.cartDetails);

          this.cartDetail = [...res?.data?.buyerCart?.cartDetails];
          this.totalCartPrice = this.cartService.countTotal(this.cartDetail);
          // this.totalTax = this.cartService.countVat(this.cartDetail);
          this.getCrossSelling(this.cartDetail);
          // this.shippingAmmountTotal = this.cartService.shippingAmmount(this.cartDetail);
          // this.cartWeigh(this.cartDetail)
          this.validatePromoCode();

          this.spinner.hide();
        }

      } ,error => {
        this.spinner.hide();
      })

      console.log(this.totalCartPrice)
      // console.log(this.totalTax)
      console.log(this.shippingAmmountTotal)
    }


  }

  sharingDataServicCartItems() {
    this.sharingDataService.count.subscribe((cartDetails: any) => {
      console.log('cartDetails', cartDetails);
      if (cartDetails != 1) {
        this.cartDetail = [...cartDetails];
        this.totalCartPrice = this.cartService.countTotal(this.cartDetail);
        // this.totalTax = this.cartService.countVat(this.cartDetail);
        this.getCrossSelling(this.cartDetail);
        // this.shippingAmmountTotal = this.cartService.shippingAmmount(this.cartDetail);
        // this.cartWeigh(this.cartDetail)
      }
    });
  }

  getCrossSelling(cartDetail) {
    this.crossSelling = []
    cartDetail.forEach(el => {
      if (el?.product?.crossSelling?.length > 0) {
        this.crossSelling.push(...el.product.crossSelling);
        console.log('crossSelling', this.crossSelling);
        const unique = [... new Set(this.crossSelling)]
        console.log('unique', unique)
        if (this.crossSelling?.length > 6) {

        this.crossSelling.length = 6;
        } else {
          return
        }
      }
    });

    // console.log('crossSelling', this.crossSelling)
  }

  // cartWeigh(cartDetails) {
  //   this.cartProductsWeigh = 0;
  //   this.pickUpLocationIds = [];
  //   cartDetails.forEach(el => {
  //     this.cartProductsWeigh = el.qty + this.cartProductsWeigh;
  //     if (el?.product?.pickUpLocationId) {
  //     this.pickUpLocationIds.push(el?.product?.pickUpLocationId);
  //     }
  //   });
  //   console.log('cartWeigh', this.cartProductsWeigh);
  //   console.log('pickUpLocationIds', this.pickUpLocationIds);
  //   const uniquePickUpLocationIds = [...new Set(this.pickUpLocationIds)];
  //   console.log('unique', uniquePickUpLocationIds);
  // }

  // getShippingFees() {
  //   const variables = {
  //     shippingFeesLookupInput: {
  //       zoneId: 'f',
  //       pickUpLocations: 'd',
  //       weight: 'd'
  //     }
  //   }
  //   this.cartService.cartShippingFees(variables).subscribe(res => {
  //     console.log('getShippingFees', res);
  //   })
  // }


  ngOnDestroy() {
    // this.getCartEventSubscription.unsubscribe();
  }

}
