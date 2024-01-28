import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WishListService } from '@resources/services/accounts/wish-list/wish-list.service';
import { CartService } from '@resources/services/cart/cart.service';
import { ProductsService } from '@resources/services/products/products.service';
import { SharingDataService } from '@resources/services/sharing-data/sharing-data.service';
import { Utils } from '@shared/utils/utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quick-view-dialog',
  templateUrl: './quick-view-dialog.component.html',
  styleUrls: ['./quick-view-dialog.component.scss']
})
export class QuickViewDialogComponent implements OnInit {
  productDetail: any;
  activeImage: any;
  productId: string;
  currency: any;
  addedToFav: boolean = false;
  util = new Utils();
  overallRatingValue: any;
  cartAdd: boolean;


  constructor(private dialogRef: MatDialogRef<QuickViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService,
    private cartService: CartService,
    private sharingDataService: SharingDataService,
    private toastr: ToastrService,
    private wishListService: WishListService,
    private route: Router,
    ) {
      this.currency = JSON.parse((sessionStorage.getItem('currency')))[0];
    }

  ngOnInit(): void {
    console.log('dataKeyQuickView', this.data);
    if ( this.data) {
      this.getProductDetails(this.data?.dataKey);
    }
  }
  closeDialog(data?) {
		this.dialogRef.close(data?.dataKey);
	}

	viewImage(img) {
		this.activeImage = img;
	}

  getProductDetails(id) {
    const variables = {
      getProductInput: {
        productId: id
      }
    }
		 this.productsService
			.getProductDetail(variables)
			.subscribe((res: any) => {
				if (res.data) {
					this.productDetail = res?.data?.product;
					console.log('productDetail', this.productDetail)
          this.activeImage = res?.data?.product?.images[0];
          this.overallRatingValue = this.util.getOverallRating(this.productDetail?.reviews);

          // this.productReviews = [...res?.data?.product?.reviews];
          // // [...res?.data?.reviews];
					// // if (this.crossSelling?.length > 6) this.crossSelling.length = 6;
					// this.relatedProducts(res?.data?.product?.subCategoryId);
					// this.getCategoryName(res?.data?.product?.categoryId);
          // this.getSubCategoryName(res?.data?.product?.subCategoryId);
          // this.getOverallRating();
					// // this.getProductReviews(id);
					// this.spinner.hide()
				}
			}, error => {
        // this.toastr.error(error);
        this.productDetail = undefined;
      });
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

  addProduct() {
    this.cartAdd = true;
		const variables = {
			addToCartInput: {
				productId: this.productDetail.productId,
				cartId: localStorage.getItem('cartId') ? localStorage.getItem('cartId') : localStorage.getItem('cartId_Guest'),
			},
		};
		this.cartService.addToCart(variables).subscribe((res: any) => {
      console.log(res);
      this.cartAdd = false;
			if (res) {
				this.sendCartItemsToCartNotifications(res.data.addToCart.cartDetails);
				this.toastr.success(`Added To Cart Succesfully`);
			}
		}, error => {
      this.cartAdd = false;
      this.ifNoSuchCart(error)
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
					localStorage.setItem(
						'FAV_NOTIFICATION',
						JSON.parse(localStorage.getItem('FAV_NOTIFICATION')) + 1
					);
				}
			}, error => {
        this.toastr.error(error)
      });
		} else {
      localStorage.setItem('redirectTo', this.route.url);
      this.route.navigate(['/auth/login']);
      this.closeDialog();
		}
  }

  getProductsByBrandId(name, id) {
    this.route.navigate(['/search'], {
      queryParams: { brandId:  this.util.createSlug(name, id)}
    });
    this.closeDialog();
  }

	sendFaveItemToFaveNotification(data) {
		this.sharingDataService.nextFave(data);
	}

  sendCartItemsToCartNotifications(res) {
		this.sharingDataService.nextCount(res);
	}

}
