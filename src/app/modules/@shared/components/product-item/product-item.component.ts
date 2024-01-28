import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from './../../../@resources/services/local-storage/local-storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WishListService } from '@resources/services/accounts/wish-list/wish-list.service';
import { CartService } from '@resources/services/cart/cart.service';
import { SharingDataService } from '@resources/services/sharing-data/sharing-data.service';
import { ToastrService } from 'ngx-toastr';
import { Utils } from '../../utils/utils'
import { QuickViewDialogComponent } from '../quick-view-dialog/quick-view-dialog.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})


export class ProductItemComponent implements OnInit {
  @Input() productId: string;
  @Input() name: string;
  @Input() price: string;
  @Input() salePrice: string;
  @Input() sale:string;
  @Input() image: string;
  @Input() productReviews: any;

   util = new Utils();

  addedToFav: boolean = false;
  currency: any;
	overallRatingValue: any;
  cartAdd: boolean;

  constructor(
    private route: Router,
    private wishListService: WishListService,
    private toastr: ToastrService,
    private sharingDataService: SharingDataService,
    private toaster: ToastrService,
    private cartService: CartService,
    private locatStorage: LocalStorageService,
    private dialog:MatDialog
  ) {
    this.currency = JSON.parse((sessionStorage.getItem('currency')))[0];
    // Util.createSlug
  }

  ngOnInit(): void {
    if (this.productReviews) {
      this.overallRatingValue = this.util.getOverallRating(this.productReviews);
    }
    console.log('overallRatingValue', this.overallRatingValue);
    // console.log('productinput', this.product);
  }

  gotoProductDetail(id) {
    console.log(id);
    this.route.navigate(['/product', this.util.createSlug(this.name , id) ]);
  }

  addToFavorite(id) {
    if (localStorage.getItem('AUTH_TOKEN')) {
      const variables = {
        addToFavouriteInput: {
          productId: id
        }
      }
      this.wishListService.addFavorite(variables).subscribe((res: any) => {
        console.log('data', res);
        if (res) {
          this.toastr.success('Success');
          this.sendFaveItemToFaveNotification(res);
          this.addedToFav = true;
          localStorage.setItem('FAV_NOTIFICATION', JSON.parse(localStorage.getItem('FAV_NOTIFICATION')) + 1 );
        }
      }, error => {
        this.toastr.error(error)
      });
    } else {
      localStorage.setItem('redirectTo', this.route.url);
      this.route.navigate(['/auth/login'], {
        queryParams: { subCategoryId: id },
      });
    }
  }

  addProduct() {
    this.cartAdd = true;
    const variables = {
      addToCartInput: {
        productId: this.productId,
        cartId: localStorage.getItem('cartId') ? localStorage.getItem('cartId') : localStorage.getItem('cartId_Guest'),
      },
    };
    this.cartService.addToCart(variables).subscribe((res: any) => {
      console.log(res);
      this.cartAdd = false;
      if (res) {
        this.locatStorage.set('CART_LENGTH',res.data.addToCart.cartDetails)
        this.sendCartItemsToCartNotifications(res.data.addToCart.cartDetails);
        this.toaster.success(`Added To Cart Succesfully`);
      }
    }, error => {
      console.log(error);
      this.cartAdd = false;
      this.ifNoSuchCart(error);
      // this.toastr.error(error)
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

  sendFaveItemToFaveNotification(data) {
    this.sharingDataService.nextFave(data);
  }

  sendCartItemsToCartNotifications(res) {
    this.sharingDataService.nextCount(res);
  }

  openQuickView() {
    console.log('productId', this.productId);
		const dialogRef = this.dialog.open(QuickViewDialogComponent, {
      width: '80%',
      data: {
        dataKey: this.productId
      }
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('result', result);


		});
	}
}
