import { SpinnerService } from './../@shared/services/spinner.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from '@resources/services/home/home.service';
import { Utils } from '@shared/utils/utils';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @ViewChild('contentScroll') content: ElementRef;

  sliders: any[] = [];
  sliderProduct: any;
  sliderCategory: any;
  sliderSubCategory: any;
  sliderSale: any;
  sliderFirst: any;
  sliderSecond: any;
  sliderThird: any;
  sliderFourth: any;
  sliderFifth: any;
  sliderSix: any;
  categories: any[];
  popularCategories: any[];
  popularSubCategories: any;
  newArrivals: any[];
  backGroundFun: any[];
  shopByGender: any[];
  brands: any;
  ages: any[];
  productsWeLove: any[];
  trendingProducts: any[];
  util = new Utils();

  constructor(
    public translate: TranslateService,
    private homeServise: HomeService,
    private route: Router,
    private spinner: SpinnerService,
  ) {
    // console.log('productlistLang', sessionStorage.getItem('lang'));
    // this.translate.use('en');
    this.switchLang(sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');

  }

  ngOnInit(): void {
    this.spinner.show();
    this.getPopularCategory();
    this.getSliderData();
    this.getPopularSubCategory();
    this.newArrivalsFun();
    this.bckgroundFun();
    this.shopByGenderFun();
    this.getBrands();
    this.getAges();
    this.getproductsWeLove();
    this.productsTrending();
  }



  getSliderData() {
    console.log('getSliderData');
    this.homeServise.getSlider().subscribe((res: any) => {
      console.log(res);
      if (res?.data?.slider) {
        this.sliders = [...res.data.slider];
        console.log('getSliderData', this.sliders);

        this.filterSlideProduct();
      }
    });
  }

  filterSlideProduct() {
    this.sliders.forEach((el, index) => {
      if (index == 0) {
        this.sliderFirst = el;
      } else if (index == 1) {
        this.sliderSecond = el;
      } else if (index == 2) {
        this.sliderThird = el;
      } else if (index == 3) {
        this.sliderFourth = el;
      } else if (index == 4) {
        this.sliderFifth = el;
      } else if (index == 5) {
        this.sliderSix = el;
      }
    });
  }

  getPopularCategory() {
    this.homeServise.popularCategory().subscribe((res: any) => {
      console.log(res);
      if (res?.data?.popularCategories) {
        this.popularCategories = [...res.data.popularCategories];
        this.popularCategories.length = 8;
        console.log('popularCategories', this.popularCategories);
      }
    });
  }

  getPopularSubCategory() {
    const variables = {
      paginationOptions: {
        page: 1,
        limit: 20,
      },
    };
    this.homeServise.getPopularSubCategory(variables).subscribe((res: any) => {
      console.log(res);
      if (res?.data?.popularSubCategories) {
        this.popularSubCategories = [...res.data.popularSubCategories];
        console.log('popularSubCategories', this.popularSubCategories);
      }
    });
  }

  newArrivalsFun() {
    const variables = {
      paginationOptions: {
        page: 1,
        limit: 6,
      },
    };
    this.homeServise.getNewArrivals(variables).subscribe((res: any) => {
      console.log(res);
      if (res?.data?.newArrivals) {
        this.newArrivals = [...res.data.newArrivals];
        // this.newArrivals.length = 6;
        console.log('newArrivals', this.newArrivals);
      }
    });
  }

  bckgroundFun() {
    const variables = {
      paginationOptions: {
        page: 1,
        limit: 4,
      },
    };
    this.homeServise.getBckgroundFun(variables).subscribe((res: any) => {
      console.log(res);
      if (res?.data?.backGroundFun) {
        this.backGroundFun = [...res.data.backGroundFun];
        console.log('backGroundFun', this.backGroundFun);
      }
    });
  }

  shopByGenderFun() {
    const variables = {
      paginationOptions: {
        page: 1,
        limit: 3,
      },
    };

    this.homeServise.shopByGender(variables).subscribe((res: any) => {
      console.log(res);
      if (res?.data?.genders) {
        this.shopByGender = [...res?.data?.genders];
        console.log('shopByGenderFun', this.shopByGender);
      }
    });
  }

  getBrands() {
    const variables = {
      paginationOptions: {
        page: 1,
        limit: 12,
      },
    };

    this.homeServise.getBrands(variables).subscribe((res: any) => {
      console.log('brands', res);
      if (res?.data?.brands) {
        this.brands = [...res.data.brands];
        console.log('brands', this.brands);
      }
    });
  }

  getAges() {
    this.homeServise.getAges().subscribe((res: any) => {
      console.log('getAges', res);
      if (res?.data?.ages) {
        this.ages = [...res.data.ages];
        this.ages.length = 4;
        console.log('getAges', this.ages);
      }
    });
  }

  getproductsWeLove() {
    const variables = {
      paginationOptions: {
        page: 1,
        limit: 6,
      },
    };

    this.homeServise.getProductsWeLove(variables).subscribe((res: any) => {
      console.log('productsWeLove', res);
      if (res?.data?.productsWeLove) {
        this.productsWeLove = [...res.data.productsWeLove];
        console.log('productsWeLove', this.productsWeLove);
      }
    });
  }

  productsTrending() {
    const variables = {
      paginationOptions: {
        page: 1,
        limit: 6,
      },
    };

    this.homeServise.getProductsTrending(variables).subscribe((res: any) => {
      console.log('trendingProducts', res);
      if (res?.data?.trendingProducts) {
        this.spinner.hide();
        this.trendingProducts = [...res.data.trendingProducts];
        console.log('trendingProducts', this.trendingProducts);
      }
    });
  }

  navigateToSlideProduct(slideEl, name) {
    console.log('slideEl', slideEl);
    if (slideEl.productId) {
      this.route.navigate(['/product', this.util.createSlug(name, slideEl.productId)]);
    } else if (slideEl.categoryId) {
      this.route.navigate(['/search'], {
        queryParams: { categoryId:  this.util.createSlug(name, slideEl.categoryId) },
      });
    } else if (slideEl.subCategoryId) {
      this.route.navigate(['/search'], {
        queryParams: { subCategoryId: this.util.createSlug(name, slideEl.subCategoryId) },
      });
    }
  }

  goTosearchPage(genderId, name) {
    this.route.navigate(['/search'], {
      queryParams: { genderId: this.util.createSlug(name, genderId) },
    });
  }

  goToAllProducts() {
    this.route.navigate(['/search']);
  }
  scrollToRight() {
    this.content.nativeElement.scrollLeft -= 200;
  }
  scrollToLeft() {
    this.content.nativeElement.scrollLeft += 200;
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
