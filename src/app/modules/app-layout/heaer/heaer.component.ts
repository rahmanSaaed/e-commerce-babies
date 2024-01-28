import { SpinnerService } from './../../@shared/services/spinner.service';
import { AccInfoService } from './../../@resources/services/accounts/acc-info/acc-details/acc-info.service';
import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Global } from '@core/globals/global';
import { WishListService } from '@resources/services/accounts/wish-list/wish-list.service';
import { UserService } from '@resources/services/auth/user.service';
import { CartService } from '@resources/services/cart/cart.service';
import { LocalStorageService } from '@resources/services/local-storage/local-storage.service';
import { ProductSearchService } from '@resources/services/product-search/product-search.service';
import { SharingDataService } from '@resources/services/sharing-data/sharing-data.service';
import { DOCUMENT } from '@angular/common';
import { Currencies } from '../../@core/enums/enums';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from '@shared/services/lang/lang.service';



@Component({
  selector: 'app-heaer',
  templateUrl: './heaer.component.html',
  styleUrls: ['./heaer.component.scss'],
})
export class HeaerComponent implements OnInit {


  cartDetailLength: number = 0;
  token: string;
  defultCurr = Currencies.EGP;
  wishList: any[] = [];
  products: any[];

  newCashCartDetails: any[];
  cartIdByToken: any;
  cartProductsByToken: any[] = [];
  cartId: string;
  currentLang: string;
  curencies: any[] = [];
  currentCurrency: any;
  constructor(
    private router: Router,
    private sharingDataService: SharingDataService,
    private cartService: CartService,
    private userService: UserService,
    private wishListService: WishListService,
    private productSearchService: ProductSearchService,
    private locatStorage: LocalStorageService,
    public global: Global,
    private accountInfoService: AccInfoService,
    private spinnerService: SpinnerService,
    @Inject(DOCUMENT) private _document: Document,
    private langService: LangService,
    private translate: TranslateService,
    private eRef: ElementRef
  ) {
    this.switchLang(sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
    // alert(this.translate.t
    // ransform('greeting'))
  }

  searchKey = '';
  showDropDown: boolean = false;
  currency: boolean = false;

  ngOnInit(): void {
    this.getCurencies();
    this.getLang();
    this.checkIcarthasIdOrToken();
    this.spinnerService.show();
    this.getFavorites();
    this.sharingDataServicCartItems();
    this.sharingDataServicFavItems();
    this.token = localStorage.getItem('AUTH_TOKEN');
    console.log('globa^^^^^^^^^^^^^',this.global.lang)
    if (
      this.locatStorage.get('buyerName') &&
      this.locatStorage.get('buyerName') != ''
    ) {
      this.global.buyerName = this.locatStorage.get('buyerName');
    } else {
      this.getBuyerInfo();
    }
    if (
      this.locatStorage.get('buyerAvatar') &&
      this.locatStorage.get('buyerAvatar') != ''
    ) {
      this.global.buyerName = this.locatStorage.get('buyerAvatar');
    } else {
      this.getBuyerInfo();
    }
  }




  validateCart() {
    if (localStorage.getItem('cartId')) {
      this.checkIfCartIdValid(localStorage.getItem('cartId'));
    } else if (localStorage.getItem('cartId_Guest')) {
      this.checkIfCartIdValid(localStorage.getItem('cartId_Guest'));
    } else {
      this.checkIcarthasIdOrToken();
    }
  }

  getCurencies() {
    this.cartService.getCurencies().subscribe((res: any) => {
      console.log('getCurencies', res);
      this.curencies = res.data.currencies;

      if (JSON.parse(sessionStorage.getItem('currency'))?.length > 0) {
        this.currentCurrency = JSON.parse(sessionStorage.getItem('currency'));
        console.log(this.currentCurrency);
      } else {
        console.log('curencies', this.curencies);
        this.currentCurrency = this.curencies.filter(
          (el) => el.isoAlpha_3 == this.defultCurr
        );
        sessionStorage.setItem(
          'currency',
          JSON.stringify(this.currentCurrency)
        );
      }
    });
  }

  changeCurrency(curency) {
    if (
      curency?.isoAlpha_3 !=
      JSON.parse(sessionStorage.getItem('currency'))[0].isoAlpha_3
    ) {
      console.log('sellectedCurrency', curency);
      this.currentCurrency = [curency];
      sessionStorage.setItem('currency', JSON.stringify(this.currentCurrency));
      this._document.defaultView.location.reload();
    }
  }

  checkIfCartIdValid(cartId) {
    const variables = {
      cartId: cartId,
    };
    this.cartService.getCart(variables).subscribe(
      (res: any) => {
        if (res) {
          this.checkIcarthasIdOrToken();
        }
      },
      (error) => {
        console.log(error);
        this.ifNoSuchCart(error);
      }
    );
  }

  ifNoSuchCart(error) {
    console.log(
      error?.graphQLErrors[0]?.extensions?.exception?.response?.statusCode ==
        404
    );
    if (
      error?.graphQLErrors[0]?.extensions?.exception?.response?.statusCode ==
      404
    ) {
      localStorage.removeItem('cartId');
      localStorage.removeItem('cartId_Guest');
      this.cartService.createCart().then((res) => {
        if (res) {
          this.checkIcarthasIdOrToken();
        }
      });
    }
  }

  sharingDataServicCartItems() {
    this.sharingDataService.count.subscribe((cartDetails: any) => {
      console.log(cartDetails);
      if (cartDetails != 1) {
        this.countNotificationCartItems(cartDetails);
      }
    });
  }

  sharingDataServicFavItems() {
    this.sharingDataService.fave.subscribe((faveItems: any) => {
      console.log(faveItems);
      this.getFavorites();
    });
  }

  getFromCart() {
    if (localStorage.getItem('cartId')) {
      this.cartId = localStorage.getItem('cartId');
    } else if (localStorage.getItem('cartId_Guest')) {
      this.cartId = localStorage.getItem('cartId_Guest');
    }

    this.locatStorage.set('CART_LENGTH', this.cartDetailLength);
    if (this.cartId) {
      this.cartDetailLength = 0;
      console.log(this.cartDetailLength);
      const variables = {
        cartId: this.cartId,
      };
      this.cartService
        .getCart(variables)
        .subscribe(({ data }: any) => {
          console.log(`cart details`, data);
          this.locatStorage.set('CART_LENGTH', data?.cart?.cartDetails.length);
          this.countNotificationCartItems(data?.cart?.cartDetails);
        });
    }
  }

  checkIcarthasIdOrToken() {
    console.log('checkIcarthasIdOrToken');
    if (localStorage.getItem('AUTH_TOKEN')) {
      this.checkCartByToken();
    } else {
      this.getFromCart();
    }
  }

  checkIfCartIdExist() {
    if (localStorage.getItem('cartId_Guest')) {
      console.log('cartId_Guest', localStorage.getItem('cartId_Guest'));
      const variables = {
        getCartInput: { cartId: localStorage.getItem('cartId_Guest') },
      };

      this.cartService.getCart(variables).subscribe((res: any) => {
        console.log('getCartBycartId_Guest', res);
        if (res?.data?.cart?.cartDetails.length > 0) {
          this.newCashCartDetails = res?.data?.cart?.cartDetails;
          console.log(this.newCashCartDetails);
          this.addCashCartToByerCart([...this.newCashCartDetails]);
          this.newCashCartDetails = [];
          localStorage.removeItem('cartId_Guest');
          localStorage.setItem('cartId', this.cartIdByToken);
          this.cartIdByToken = null;
          this.cartProductsByToken = [];
        } else {
          localStorage.setItem('cartId', this.cartIdByToken);
          if (this.cartProductsByToken?.length > 0) {
            this.sendCartItemsToCartNotifications([
              ...this.cartProductsByToken,
            ]);
          }
        }
      });
    } else {
      localStorage.setItem('cartId', this.cartIdByToken);
      if (this.cartProductsByToken?.length > 0) {
        this.sendCartItemsToCartNotifications([...this.cartProductsByToken]);
      }
    }
  }

  checkCartByToken() {
    this.cartService.getCartByer().subscribe(
      (res: any) => {
        console.log('checkCartByToken', res);

        if (res?.data?.buyerCart?.cartId) {
          this.cartIdByToken = res?.data?.buyerCart?.cartId;
          this.cartProductsByToken = res.data.buyerCart.cartDetails;
          if (localStorage.getItem('cartId_Guest')) {
            this.checkIfCartIdExist();
          } else {
            localStorage.setItem('cartId', this.cartIdByToken);
            this.sendCartItemsToCartNotifications([
              ...this.cartProductsByToken,
            ]);
            this.cartProductsByToken = [];
            this.cartIdByToken = null;
          }
        }
      },
      (err) => {
        this.createCartId().then((res) => {
          this.checkIfCartIdExist();
        });
      }
    );
  }

  createCartId() {
    return new Promise((resolve) => {
      this.cartService.creteCart().subscribe((res: any) => {
        this.cartIdByToken = res.data.createCart.cartId;
        resolve(this.cartIdByToken);
      });
    });
  }

  addCashCartToByerCart(newCashCartDetails) {
    console.log(this.newCashCartDetails);
    newCashCartDetails.forEach((el) => {
      if (el) {

        let variables = {
          addToCartInput: {
            cartId: this.cartIdByToken,
            productId: el.product.productId,
            qty: el.qty,
          },
        };
        this.addCashProductsTocar(variables);


      }
    });

    console.log(this.cartProductsByToken);
    console.log(this.newCashCartDetails);
    localStorage.removeItem('cartId_Guest');
    localStorage.setItem('cartId', this.cartIdByToken);
    this.sendCartItemsToCartNotifications([
      ...this.cartProductsByToken,
      ...this.newCashCartDetails,
    ]);
  }

  addCashProductsTocar(variables) {
    this.cartService.addToCart(variables).subscribe((res) => {
      if (res) {
        console.log('datat add to cart from cash cart', res);
      }
    });
  }

  countNotificationCartItems(cartDetails) {
    this.cartDetailLength = 0;
    if (cartDetails) {
      cartDetails.forEach((el) => {
        if (el.qty) {
          this.cartDetailLength = this.cartDetailLength + el.qty;
        }
      });
      this.locatStorage.set('CART_LENGTH', this.cartDetailLength);
    }
  }

  getFavorites() {
    if (localStorage.getItem('AUTH_TOKEN')) {
      this.wishListService.getWishList().subscribe((res: any) => {
        if (res?.data?.favourites) {
          console.log(res);
          this.wishList = [...res?.data?.favourites];
          this.spinnerService.hide();
        }
      });
    }
  }

  logIn() {
    console.log(this.router.url);
    localStorage.setItem('redirectTo', this.router.url);
    this.router.navigate(['../auth']);
  }

  register() {
    this.router.navigate(['/auth/register']);
  }

  navigateSearch() {
    this.router.navigate(['/cart']);
  }

  navigateHome() {
    this.router.navigate(['']);
  }

  logOut() {
    this.userService.logOut();
    localStorage.clear();
    this.sendCartItemsToCartNotifications([]);
    this.wishList = [];
    this.token = undefined;
  }

  sendCartItemsToCartNotifications(res) {
    this.sharingDataService.nextCount(res);
  }

  sendFaveItemToFaveNotification(data) {
    this.sharingDataService.nextFave(data);
  }

  searchByKey( ) {
    const variables = {
      searchProduct: {
        keyword: this.searchKey,
      },
    };

    console.log(variables);
    console.log(this.searchKey);
    this.productSearchService
      .getProductByKey(variables)
      .subscribe((res: any) => {
        console.log(res);
        if (res?.data?.searchByKeyword) {
          this.products = res.data.searchByKeyword;
        } else {
          // this.products = [];
        }
      });
  }

  // searchByProductId(id) {
  //   console.log(id);
  //   console.log('searchHitKeyEnter', event);
  //   this.router.navigate(['./search'], {
  //     queryParams: { key: id },
  //   });
  //   this.searchKey = undefined;
  //   this.products.length = 0;
  // }

  getBuyerInfo() {
    this.accountInfoService.getBuyer().subscribe(
      ({ data }) => {
        this.global.buyerName = data['buyer']['buyerFirstName'];
        this.global.buyerAvatar = data['buyer']['avatar'];
        this.locatStorage.set('buyerName', data['buyer']['buyerFirstName']);
        this.locatStorage.set('buyerAvatar', data['buyer']['buyerAvatar']);
      },
      (error) => {
        // this.toaster.error(error)
      }
    );
  }

  changeLang(lang) {
    // this.langService.switchLang(lang)
    sessionStorage.removeItem('lang');
    sessionStorage.setItem('lang', lang);
    this.global.lang = lang;
    // this.switchLang(lang);
    this.refreshPage();
  }

  getLang() {
    console.log('getLang', sessionStorage.getItem('lang'));
    if (sessionStorage.getItem('lang')) {
      this.currentLang = sessionStorage.getItem('lang');
      console.log('currentLang', this.currentLang);
    } else {
      this.currentLang = 'en';
      sessionStorage.setItem('lang', 'en');
    }
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }

  navigateTohome() {
    this.router.navigate([''])
    setTimeout(() => {
    this._document.defaultView.location.reload();
    },);
  }

  closeDropdown(data) {
    console.log('closeDropdown', data);
    this.products = [];
  }
  navigateDropDownSearch(event) {
    console.log('navigateDropDownSearch', event)
    this.searchKey = this.products[event].name || this.products[event].nameAr;
  }


  searchFocus() {
    console.log('searchFocus');
    if (this.searchKey) {
      this.searchByKey();
    }
  }

  searchWithEnter() {
    this.navigateToSrarchPageWithProducts()
  }

  navigateToSrarchPageWithProducts() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "product": this.searchKey,
      }
  };
    this.router.navigate(['./search'], navigationExtras);
    this.products = [];
  }

  switchLang(lang: string) {
    console.log('lang', lang )
    this.translate.use(lang);
  }

}
