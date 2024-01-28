import { Component, OnInit } from '@angular/core';
import { HandleErrorsService } from '@resources/services/handle-errors/handle-errors.service';
import { OrdersService } from '@resources/services/orders/orders.service';
import { SharingDataService } from '@resources/services/sharing-data/sharing-data.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent implements OnInit {
  currentstep: string = 'billingInfo';
  buyerInfo: any;

  addressSellected: any;
  shippingcode: any;
  orderId: any;

  constructor(private orderService: OrdersService,
    private sharingDataService: SharingDataService,
    private toaster: ToastrService,
    private handleErrorsService: HandleErrorsService
    ) {}

  ngOnInit(): void {
    console.log('currentstep', this.currentstep);
  }

  nextStep(step) {
    console.log('step', step);

    if (step?.step == 'shippingDetails') {
      this.currentstep = 'shippingDetails';
      this.buyerInfo = step;
    } else if (step?.step == 'paymentMethod') {
      this.currentstep = 'paymentMethod';
      this.addressSellected = step;
    } else if (step.step == 'confirmation') {
      // this.currentstep = 'confirmation';
      this.createOrder();
    } else if (step?.step == 'billingInfo') {
      this.currentstep = 'billingInfo';
    }
  }

  accInfoFunc(orderaccInfo) {
    console.log('orderaccInfo', orderaccInfo);
  }

  // createOrder() {

  // }

  createOrder() {
    console.log('addressSellected', this.addressSellected)
    const variables = {
      createOrderInput: {
        email: this.buyerInfo.email,
        mobile: this.buyerInfo.phoneNumber,
        addressId: this.addressSellected?.addressId,
        promoCode: localStorage.getItem('PROMO-CODE') ? localStorage.getItem('PROMO-CODE') : undefined
      }

    };

    // !variables?.createOrderInput?.promoCode ? delete  variables?.createOrderInput?.promoCode : return;

    this.orderService.createOrders(variables).subscribe((res: any) => {
      console.log('createOrder', res);
      localStorage.removeItem('PROMO-CODE');
      if (res?.data?.createOrder?.orderCode) {
        this.shippingcode = res?.data?.createOrder?.orderCode;
        this.orderId = res?.data?.createOrder?.orderId;

      this.currentstep = 'confirmation';
      localStorage.removeItem('cartId');
      this.sendCartItemsToCartNotifications([]);
      }
    }, error => {
      // this.toaster.error(error);
      this.handleErrorsService.handleError(error);
    });
  }

  sendCartItemsToCartNotifications(res) {
		this.sharingDataService.nextCount(res);
  }

  print() {
    this.shippingcode = undefined;
    this.shippingcode = 'vdfx';

  }





}
