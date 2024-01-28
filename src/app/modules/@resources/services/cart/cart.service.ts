import { Injectable } from '@angular/core';
import { QueryFull } from '@core/models/graph-models';
import { GraphFunctionsTypesInputs } from '@resources/graph-functions/graph-functions-types-inputs';
import { Apollo } from 'apollo-angular';
import { BaseServiceService } from 'src/app/modules/graphql/base-service/base-service.service';

@Injectable({
  providedIn: 'root',
})
export class CartService extends GraphFunctionsTypesInputs{
  total: number;
  tax: number;
  shipping: number;
  constructor(
    private baseServiceService: BaseServiceService
    ) {
    super()
  }

  creteCart() {
    const input = {} as QueryFull;
    input.func = this.FUNC_CREATE_CART;
    input.return = this.CART_ID;
    return this.baseServiceService.generalMutation(input);
  }

  addToCart(variables?) {
    const input = {} as QueryFull;
    input.func = this.FUNC_ADD_TO_CART;
    input.variable = this.INPUT_ADD_TO_CART;
    input.type = this.TYPE_ADD_TO_CART;
    input.return = this.ADD_TO_CART;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }

  getCart(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_GET_CART;
    input.variable = this.INPUT_GET_CART;
    input.type = this.TYPE_GET_CART;
    input.return = this.CART_PRODUCTS;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
  }

  deleteProductFromCart(variables?) {
    const input = {} as QueryFull;
    input.func = this.FUNC_DELETE_PRODUCT_CART;
    input.variable = this.INPUT_DELETE_PRODUCT_CART;
    input.type = this.TYPE_DELETE_PRODUCT_CART;
    input.return = this.MESSAGE;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }


  getCartByer() {
    const input = {} as QueryFull;
    input.func = this.FUNC_BUYER_CART;
    input.return = this.GET_CART;
    return this.baseServiceService.generalQuery(input);
  }

  getCurencies() {
    const input = {} as QueryFull;
    input.func = this.FUNC_CURENCIES;
    input.return = this.CURENCIES;
    return this.baseServiceService.generalQuery(input);
  }

  validateCode(variables?) {
    const input = {} as QueryFull;
    input.func = this.FUNC_VALIDATE_PROMO_CODE;
    input.variable = this.INPUT_VALIDATE_PROMO_CODE;
    input.type = this.TYPE_VALIDATE_PROMO_CODE;
    input.return = this.PROMO_CODE;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
  }

  updateProductCartQuantity(variables?) {
    const input = {} as QueryFull;
    input.func = this.FUNC_UPDATE_CART;
    input.variable = this.INPUT_UPDATE_CART;
    input.type = this.TYPE_UPDATE_CART;
    input.return = this.UPDATE_CART;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }

  cartShippingFees(variables?) {
    const input = {} as QueryFull;
    input.func = this.FUNC_CART_FEES;
    input.variable = this.INPUT_CART_FEES;
    input.type = this.TYPE_CART_FEES;
    input.return = this.SHIPPING_FEES;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
  }

  countTotal(cartDetail) {
    this.total = 0;
    cartDetail.forEach((el) => {
      if (el?.product?.salePrice) {
        this.total = (el?.product?.salePrice * JSON.parse(el?.qty)) + this.total;
      } else {
        this.total = (el.product?.price * JSON.parse(el?.qty)) + this.total;
      }
    });
    console.log('countTotal', this.total);

    return this.total ? this.total : 0 ;
  }

  countVat(cartDetail) {
    this.tax = 0;
    cartDetail.forEach((el) => {
      if (el?.product?.tax) {
        this.tax = (el?.product?.tax * JSON.parse(el?.qty)) + this.tax;
      }
    });
    console.log('tax', this.tax);

    return this.tax ? this.tax : 0;
  }

  shippingAmmount(cartDetail) {
    this.shipping = 0;
    cartDetail.forEach((el) => {
      if (el?.product?.freeShipping != 1) {
        this.shipping = this.shipping + (el?.product?.shippingFees * JSON.parse(el?.qty) );
      }
    });
    console.log('shipping', this.shipping);

    return this.shipping;
  }


  createCart() {
    return new Promise((resolve, reject) => {
    if (localStorage.getItem('cartId')) {
      resolve(localStorage.getItem('cartId'));
    } else {
      this.creteCart().subscribe((res: any) => {
        if (localStorage.getItem('AUTH_TOKEN')) {
          localStorage.setItem('cartId', res.data.createCart.cartId);
        }  else {
          localStorage.setItem('cartId_Guest', res.data.createCart.cartId);
        }
         resolve(res.data.createCart.cartId);
      });
    }
  }
  )}
}
