import { Component, Input, OnInit } from '@angular/core';
import { WishListService } from '@resources/services/accounts/wish-list/wish-list.service';
import { CartService } from '@resources/services/cart/cart.service';
import { SharingDataService } from '@resources/services/sharing-data/sharing-data.service';
import { ToastrService } from 'ngx-toastr';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from '@shared/utils/utils';

@Component({
  selector: 'whishlist-item',
  templateUrl: './whishlist-item.component.html',
  styleUrls: ['./whishlist-item.component.scss']
})
export class WhishlistItemComponent implements OnInit {
  @Input() productId: string;
  @Input() name: string;
  @Input() price: string;
  @Input() image: string;
  @Input() favouriteId: String;
  @Input() salePrice:string;
  @Input() productReviews: any;

  util = new Utils();




  @Output() deletedItem = new EventEmitter<any>();
  currency: any;
  cartAdd: boolean;
  overallRatingValue: any;


  constructor(private cartService: CartService,
    private sharingDataService: SharingDataService,
    private toaster: ToastrService,
    private wishListService: WishListService,
    private route: Router,
    ) {
      this.currency = JSON.parse((sessionStorage.getItem('currency')))[0];
    }

  ngOnInit(): void {
    if (this.productReviews) {
      this.overallRatingValue = this.util.getOverallRating(this.productReviews);
    }  }


  deleteItemFromFave(favouriteId) {
    const variables = {deleteFavouriteInput: {favouriteId: favouriteId}}
    this.wishListService.deleteBuyerWithoutInputVar(variables).subscribe((res: any) => {
      if (res) {
        this.toaster.success('Success');
        this.sendFaveItemToFaveNotification(res);
        this.addNewItem(res);
      }
    });
  }


  addNewItem(value: any) {
    this.deletedItem.emit(value);
  }


gotoProductDetail(id) {
  this.route.navigate(['/product',  this.util.createSlug(this.name, id) ])
}


  addProduct() {
    this.cartAdd = true;
    const variables = {
      addToCartInput: {
        productId: this.productId,
        cartId: localStorage.getItem('cartId') ? localStorage.getItem('cartId') : localStorage.getItem('cartId_Guest')
      },
    };
    this.cartService.addToCart(variables).subscribe((res: any) => {
      this.cartAdd = false;
      if (res) {
        this.sendCartItemsToCartNotifications(res.data.addToCart.cartDetails)
        this.toaster.success(`Added To Cart Succesfully`);
      }
    }, error => {
      this.cartAdd = false;
      // this.toaster.error(error)
      this.ifNoSuchCart(error);
    });
  }

  ifNoSuchCart(error) {
    console.log(error?.graphQLErrors[0]?.extensions?.exception?.response?.statusCode == 404);
    if (error?.graphQLErrors[0]?.extensions?.exception?.response?.statusCode == 404) {
      localStorage.removeItem('cartId');
      localStorage.removeItem('cartId_Guest');
      this.cartService.createCart().then(res => {
        if (res) {
          this.addProduct();
        }
      })
    }
  }

  addProductToCart() {
    if (localStorage.getItem('cartId') || localStorage.getItem('cartId_Guest')) {
      this.addProduct();
    } else {
      this.cartService.createCart().then((res) => {
        console.log(res);
        this.addProduct();
      });
    }
  }

  sendFaveItemToFaveNotification(data){
    this.sharingDataService.nextFave(data)
  }

  sendCartItemsToCartNotifications(res) {
    this.sharingDataService.nextCount(res)
  }

}
