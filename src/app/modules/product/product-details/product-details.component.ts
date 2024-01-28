import { SpinnerService } from './../../@shared/services/spinner.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Returns } from '@resources/returns/returns';
import { WishListService } from '@resources/services/accounts/wish-list/wish-list.service';
import { CartService } from '@resources/services/cart/cart.service';
import { CategoryService } from '@resources/services/categories/category.service';
import { ProductsService } from '@resources/services/products/products.service';
import { SharingDataService } from '@resources/services/sharing-data/sharing-data.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from '@shared/utils/utils';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  @ViewChild('contentScroll') content: ElementRef;


	url: string;
	productDetail: any;
	activeImage: string;
	category: any;
	subCategory: any;
	addedToFav: boolean = false;
  util = new Utils();


	related: any;
	crossSelling: any[] = [];
	productReviews: any[] = [];
	overallRatingValue: any;
	customerReviews: any = {
		'0':0,
		'1':0,
		'2':0,
		'3':0,
		'4':0,
		'5':0
	}
  currency: string;
  cartAdd: boolean;
	constructor(
		private router: ActivatedRoute,
		private productsService: ProductsService,
		private categoryService: CategoryService,
		private route: Router,
		private cartService: CartService,
		private toaster: ToastrService,
		private sharingDataService: SharingDataService,
		private wishListService: WishListService,
		private toastr: ToastrService,
    private spinner: SpinnerService,
    public translate: TranslateService,

	) {
    this.currency = JSON.parse((sessionStorage.getItem('currency')))[0];
    this.switchLang(sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');

  }

	ngOnInit(): void {
		this.spinner.show();
		this.getQueryParam();
		console.log('am here')
	}

	getQueryParam() {
		// this.router.snapshot.pathFromRoot.map((res) => {
		//   console.log('pathFromRoot' , res);
		//   if (res.params.id) {
		//     this.getProductDetails(res.params.id);
		//   }
		// });

		this.router.paramMap.subscribe((params) => {
      let id = params.get('id');

      console.log('productDetailsId', id);
      console.log(this.util.unSlug(id));

			if (id) {
				this.getProductDetails(this.util.unSlug(id));
				// this.getProductReviews(this.util.unSlug(id));
			}
		});
	}

	relatedProducts(subCategoryId) {
    console.log('relatedProducts', subCategoryId);
		const variables = {
      getProductBySubcategoryInput: {subCategoryId: subCategoryId},
			paginationOptions: {  },
		};
    console.log('relatedProductsVariables', variables)
		this.productsService.getProductRelated(variables).subscribe((res: any) => {
			console.log('relatedProducts', res);
			if (res.data) {
				this.related = res.data.related;
			}
		});
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
          this.crossSelling = [...res?.data?.product?.crossSelling];
          this.productReviews = [...res?.data?.product?.reviews];
          // [...res?.data?.reviews];
					// if (this.crossSelling?.length > 6) this.crossSelling.length = 6;
					this.relatedProducts(res?.data?.product?.subCategoryId);
					this.getCategoryName(res?.data?.product?.categoryId);
          this.getSubCategoryName(res?.data?.product?.subCategoryId);
          console.log('productReviews', this.productReviews)

           this.overallRatingValue = this.util.getOverallRating(this.productReviews);
           this.getOverallRating();
           console.log('productReviews', this.productReviews)
          // this.getProductReviews(id);
          console.log('overallRatingValue', this.overallRatingValue);
					this.spinner.hide()
				}
			}, error => {
        // this.toastr.error(error);
        this.productDetail = undefined;
      });
	}

	viewImage(img) {
		this.activeImage = img;
	}

	getCategoryName(id) {
    const variables = {
      getCategoryInput: {
        categoryId: id
      }
    }
		this.categoryService.getCategoryById(variables).subscribe((res: any) => {
			this.category = res.data.category;
		});
	}

	getSubCategoryName(id) {
    const variables = {
      getSubcategoryInput: {
        subCategoryId: id
      }
    }
		this.categoryService
			.getSubCategoryBySubCategoryId(variables)
			.subscribe((res: any) => {
				this.subCategory = res.data.subCategory;
			});
	}

	goToCategoryProduct(id) {
		this.route.navigate(['/search'], { queryParams: { categoryId: id } });
	}

	goToSubCategoriesProducts(id) {
		this.route.navigate(['/search'], { queryParams: { subCategoryId: id } });
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
				this.toaster.success(`Added To Cart Succesfully`);
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
		}
	}

	sendFaveItemToFaveNotification(data) {
		this.sharingDataService.nextFave(data);
	}

	sendCartItemsToCartNotifications(res) {
		this.sharingDataService.nextCount(res);
	}

	navContact() {
		this.route.navigate(['./mumez/contact-us'])
	}


  getProductsByBrandId(name, id) {
    this.route.navigate(['/search'], {
      queryParams: { brandId:  this.util.createSlug(name, id)}
    });
  }
	// getProductReviews(productId: string) {
  //   let count =0;
  //   console.log('getProductReviews', productId)
  //   const variables = {
  //     getReviewInput: {
  //       reviewId: productId
  //     }
  //   }
	// 	this.productsService.getProductReviews(variables).subscribe(({ data }) => {
	// 		this.productReviews = data['reviewsByProductId'];
	// 		this.getOverallRating()
	// 		console.log('this.productReviews',this.productReviews)
	// 	})
	// }

	getOverallRating() {
		this.customerReviews = {
			'0':0,
			'1':0,
			'2':0,
			'3':0,
			'4':0,
			'5':0
		}
		let count = 0;
		if(this.productReviews?.length > 0){
			this.productReviews.map( item => {
				count+=item.rate;
				if(item.rate ==0) this.customerReviews['0']+=1;
				if(item.rate >=0&& item.rate <=1) this.customerReviews['1']+=1;
				if(item.rate >=2&& item.rate <=2) this.customerReviews['2']+=1;
				if(item.rate >=3&& item.rate <=3) this.customerReviews['3']+=1;
				if(item.rate >=4&& item.rate <=4) this.customerReviews['4']+=1;
				if(item.rate >=5&& item.rate <=5) this.customerReviews['5']+=1;
			});
      // this.overallRatingValue = (count/this.productReviews.length).toFixed(1);
      // console.log('overallRatingValue', this.overallRatingValue);

		} else {
			// this.overallRatingValue = 0;

		}



	}


  scrollToRight() {
    this.content.nativeElement.scrollLeft -= 20;
  }
  scrollToLeft() {
    this.content.nativeElement.scrollLeft += 20;
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }


}
