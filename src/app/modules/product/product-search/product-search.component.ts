import { SpinnerService } from './../../@shared/services/spinner.service';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '@resources/services/categories/category.service';
import { ProductSearchService } from '@resources/services/product-search/product-search.service';
import { Options } from 'ng5-slider';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from '@shared/utils/utils';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;

  value: number = 0;
  highValue: number = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000,
  };

  page: number = 1;
  limit: number = 10;

  products: any[];
  category: any;
  subCategory: any;
  subCategories: any;
  subCategoryId: string;
  util = new Utils();

  filterSubCategoryForm: FormGroup;
  newProductsFiltered: any[] = [];
  cloneProducts: any[];
  ages: any[];
  brands: any[];
  genders: any[];
  fromPriceFilter: any;
  toPriceFilter: any;
  subCategoriesIds: any[] = [];
  brandsIds: any[] = [];
  saleIds: any[] = [];
  gendersIds: any[] = [];
  agesIds: any[] = [];
  filterIdsParam: any[] = [];
  categoryId: String;
  showFilterMenue: boolean = false;
  parameter: {
    categoryId: String;
    subCategoryId: any[];
    genderId: any[];
    ageId: any[];
    sale: string | any[] | boolean;
    brandId: any[];
    minPrice: any;
    maxPrice: any;
  };
  genderId: any;
  brandId: any;
  ageId: string;
  sale: boolean;

  constructor(
    private productSearchService: ProductSearchService,
    private router: ActivatedRoute,
    private route: Router,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private spinner: SpinnerService,
    private translate: TranslateService
  ) {
    this.filterSubCategoryForm = this.fb.group({
      checkArray: this.fb.array([]),
    });

    this.switchLang(sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');

  }

  ngOnInit(): void {
    this.spinner.show();
    this.getQueries();
    this.getAges();
    this.getBrands();
    this.getGenders();
  }

  onCheckboxChange(e?, type?) {
    // type == 'sale' ? this.sale = true : this.sale = true;
    console.log('sale', this.sale)
    console.log('onCheckboxChange', e, type);
    const checkArray: FormArray = this.filterSubCategoryForm.get(
      'checkArray'
    ) as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      this.manipulateteIdsAddd(e.target.value, type);
    } else {
      this.manipulateteIdsRemove(e.target.value, type);
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          console.log('checkArray', checkArray)
          if (checkArray?.length  == 0) {
            this.clearQueryParam();
          }
          return;
        }
        i++;
      });
    }
  }


  checkedEvnt() {
    console.log(' checkboxes ', this.checkboxes);
    if (this.checkboxes) {
      this.checkboxes.forEach((element) => {
        element.nativeElement.checked = false;
        //  this.userRoleListTemp.length = 0;
      });
    }
  }

  manipulateteIdsAddd(id, type) {
    this.filterIdsParam = [];
    if (type == 'subCategories') {
      this.subCategoriesIds.push(id);
    } else if (type == 'brands') {
      this.brandsIds.push(id);
    } else if (type == 'ages') {
      this.agesIds.push(id);
    } else if (type == 'genders') {
      this.gendersIds.push(id);
    } else if (type == 'sale') {
      this.saleIds.push(id);
    }

    const idesParsm = this.formationOfFilterObjectOfArray();
    this.filterIdsParam.push(idesParsm);
    console.log('filterIdsParam', this.filterIdsParam);
    this.submitFilterSubCategoryForm();
  }

  // array.splice(index, 1);
  manipulateteIdsRemove(id, type) {
    this.filterIdsParam = [];

    if (type == 'subCategories') {
      const index = this.subCategoriesIds.indexOf(id);
      this.subCategoriesIds.splice(index, 1);
    } else if (type == 'brands') {
      const index = this.brandsIds.indexOf(id);
      this.brandsIds.splice(index, 1);
    } else if (type == 'ages') {
      const index = this.agesIds.indexOf(id);
      this.agesIds.splice(index, 1);
    } else if (type == 'genders') {
      const index = this.gendersIds.indexOf(id);
      this.gendersIds.splice(index, 1);
    } else if (type == 'sale') {
      const index = this.saleIds.indexOf(id);
      this.saleIds.splice(index, 1);
    }

    const idesParsm = this.formationOfFilterObjectOfArray();
    this.filterIdsParam.push(idesParsm);
    console.log('filterIdsParam', this.filterIdsParam);
    console.log(Object.keys(this.filterIdsParam[0]).length === 0)

    if (Object.keys(this.filterIdsParam[0]).length === 0) {
      // console.log();
      this.clearQueryParam();
    }

    this.submitFilterSubCategoryForm();
  }

  formationOfFilterObjectOfArray() {
    console.log('saleIds', this.saleIds);
    this.parameter = {
      categoryId: this.categoryId,
      subCategoryId: this.subCategoriesIds,
      genderId: this.gendersIds,
      ageId: this.agesIds,
      sale: this.saleIds.length > 0 ? '1' : [],
      brandId: this.brandsIds,
      minPrice: this.fromPriceFilter,
      maxPrice: this.toPriceFilter,
    };
    console.log('parameter', this.parameter);

    for (let key of Object.keys(this.parameter)) {
      if (this.parameter[key]?.length > 0) {
        console.log(this.parameter[key]);
      } else {
        delete this.parameter[key];
      }
    }

    if (this.parameter?.sale == '1') {
      this.parameter.sale = true;
    }

    console.log('parameter', this.parameter);

    return this.parameter;
  }

  submitFilterSubCategoryForm(e?, formValue?) {
    this.limit =  this.limit;
    const variables = {
      filterProductInput: this.filterIdsParam[0] ? this.filterIdsParam[0] : [],
      paginationOptions: {
        page: this.page,
        limit: this.limit,
      },
    };
    console.log(variables);
    this.productSearchService.filterProducts(variables).subscribe(
      (res: any) => {
        if (res?.data?.filterProducts?.length > 0) {
          this.products = [...res?.data?.filterProducts];
        }
        console.log('submitFilterSubCategoryForm', res);
      },
      (err) => {
        this.products = [];
      }
    );
  }

  price($event) {
    console.log('price', $event);
    this.toPriceFilter = $event.highValue;
    this.fromPriceFilter = $event.value;
    this.filterProductsBySubCategory();
  }

  getQueries() {
    this.router.queryParams.subscribe((params) => {
      console.log('filterSubCategoryForm');
      this.filterSubCategoryForm.reset('');
      this.checkedEvnt();
      if (params['subCategoryId']) {
        this.subCategories = undefined;
        this.subCategoryId = this.util.unSlug(params['subCategoryId']);
        this.getProductsBysubCategoryIdFunc(this.subCategoryId);
        this.getSubCategoryName(this.util.unSlug(this.subCategoryId));
      } else if (params['categoryId']) {
        this.subCategory = undefined;
        this.categoryId = this.util.unSlug(params['categoryId'])
        this.getProductsByCategoryIdFunc(this.categoryId);
        this.getCategoryName(this.categoryId);
        this.getSubCategoriesByCategoryId(this.categoryId);
      } else if (params['products']) {
        this.getProductsWithSale();
      } else if (params['key']) {
        this.searchByKey(params['key']);
      } else if (params['genderId']) {
        this.genderId = this.util.unSlug(params['genderId']);
        this.getProductsByGenderId(this.genderId);
      } else if (params['brandId']) {
        this.brandId = this.util.unSlug(params['brandId'])
        this.getProductsByBrandId(this.util.unSlug(this.brandId));
      } else if (params['ageId']) {
        this.ageId = this.util.unSlug(params['ageId']);
        this.getProductsByAgeId(this.ageId);
      } else if (params['product']) {
        this.searchWithWord(params['product']);
      } else {
        // this.products = [];
        this.submitFilterSubCategoryForm();
      }
    });
  }

  paginateProducts() {
    this.router.queryParams.subscribe((params) => {
      if (params['subCategoryId']) {
        this.getProductsBysubCategoryIdFunc(this.util.unSlug(params['subCategoryId']));
      } else if (params['categoryId']) {
        this.categoryId = this.util.unSlug(params['categoryId'])
        this.getProductsByCategoryIdFunc(this.categoryId);
      } else if (params['products']) {
        this.getProductsWithSale();
      } else if (params['key']) {
        this.searchByKey(params['key']);
      } else if (params['genderId']) {
        this.getProductsByGenderId(this.util.unSlug(params['genderId']));
      } else if (params['brandId']) {
        this.getProductsByBrandId(this.util.unSlug(params['brandId']));
      } else if (params['ageId']) {
        this.getProductsByAgeId(this.util.unSlug(params['ageId']));
      } else {
        this.submitFilterSubCategoryForm();
      }
    });
  }

  getProductsBysubCategoryIdFunc(id) {
    const variables = {
      getProductBySubcategoryInput: {
        subCategoryId: id,
      },
      paginationOptions: {
        limit: this.limit,
        page: this.page,
      },
    };
    this.productSearchService.getProductsBysubCategoryId(variables).subscribe(
      (res: any) => {
        console.log(res);
        this.products = res.data.productsBySubCategoryId;
        console.log('products', this.products);
        this.cloneProducts = [...this.products];
      },
      (error) => {
        this.products = [];
        this.toaster.error(error);
      }
    );
  }

  getProductsByGenderId(id) {
    const variables = {
      getProductByGenderInput: {
        genderId: id,
      },
      paginationOptions: {
        page: this.page,
        limit: this.limit,
      },
    };
    this.productSearchService.shopByGender(variables).subscribe(
      (res: any) => {
        console.log(res);
        this.products = res.data.productsByGenderId;
        console.log('productsByGenderId products', this.products);
        this.cloneProducts = [...this.products];
      },
      (error) => {
        this.products = [];
        this.toaster.error(error);
      }
    );
  }

  getProductsByBrandId(id) {
    const variables = {
      getProductByBrandInput: {
        brandId: id,
      },
      paginationOptions: {
        page: this.page,
        limit: this.limit,
      },
    };
    this.productSearchService.producstByBrandId(variables).subscribe(
      (res: any) => {
        console.log(res);
        this.products = res.data.productsByBrandId;
        console.log('producstByBrandId products', this.products);
        this.cloneProducts = [...this.products];
      },
      (error) => {
        this.products = [];
        this.toaster.error(error);
      }
    );
  }

  getProductsByAgeId(id) {
    const variables = {
      getProductByAgeInput: { ageId: id },
      paginationOptions: {
        page: this.page,
        limit: this.limit,
      },
    };
    this.productSearchService.producstByAgeId(variables).subscribe(
      (res: any) => {
        console.log(res);
        this.products = res.data.productsByAgeId;
        console.log('productsByAgeId products', this.products);
        this.cloneProducts = [...this.products];
      },
      (error) => {
        this.products = [];
        this.toaster.error(error);
      }
    );
  }

  getProductsByCategoryIdFunc(id) {
    const variables = {
      getProductByCategoryInput: {
        categoryId: id,
      },
      paginationOptions: {
        page: this.page,
        limit: this.limit,
      },
    };
    this.productSearchService.getProductsByCategoryId(variables).subscribe(
      (res: any) => {
        console.log(res);
        this.products = res.data.productsByCategoryId;
        console.log(this.products);
        this.cloneProducts = [...this.products];
      },
      (error) => {
        this.products = [];
        this.toaster.error(error);
      }
    );

  }

  searchWithWord(searchWord) {
    console.log('ids');
    const variables = {
      searchProduct: {
        keyword:  searchWord
      }
    };
    this.productSearchService.searchProductWithWord(variables).subscribe(
      (res: any) => {
        console.log(res);
        this.products = res?.data?.productSearch;
        console.log(this.products);
        this.cloneProducts = [...this.products];
      },
      (error) => {
        this.products = [];
        // this.toaster.error(error);
      }
    );

  }


  getSubCategoriesByCategoryId(id) {
    const variables = {
      getSubcategoryByCategoryInput: {
        categoryId: id,
      },
    };
    this.categoryService.getSubCategoryByCategoryId(variables).subscribe(
      (res: any) => {
        this.subCategories = res.data.subCategoryByCategoryId;
        console.log('getSubCategoriesByCategoryId', res);
      },
      (error) => {
        // this.toaster.error(error);
      }
    );
  }

  getCategoryName(id) {
    const variables = {
      getCategoryInput: {
        categoryId: id,
      },
    };
    this.categoryService.getCategoryById(variables).subscribe((res: any) => {
      this.category = res?.data?.category;
      console.log('getCategoryName', res);
    });
  }

  filterBySubCategory(formValue, subCategoryId) {
    console.log(formValue, subCategoryId);
  }

  getSubCategoryName(id) {
    const variables = {
      getSubcategoryInput: {
        subCategoryId: id,
      },
    };
    this.categoryService
      .getSubCategoryBySubCategoryId(variables)
      .subscribe((res: any) => {
        this.subCategory = res?.data?.subCategory;
        console.log('getSubCategoryName', res);
        this.categoryId = res?.data?.subCategory?.categoryId;
        this.getCategoryName(res?.data?.subCategory?.categoryId);
      });
  }

  filterProductsBySubCategory(filtertBy?) {
    this.newProductsFiltered = [];
    this.cloneProducts.forEach((el) => {
      if (filtertBy?.length > 0) {
        this.filterByOptions(el, filtertBy);
      } else {
        this.filterPrice(el);
      }
    });

    if (this.newProductsFiltered?.length == 0 && filtertBy?.length != 0) {
      this.products = [] = [];
    } else if (filtertBy?.length == 0) {
      this.products = [...this.cloneProducts];
    } else {
      this.products = [] = [];
      this.products = [...this.newProductsFiltered];
    }
  }

  filterByOptions(el, filtertBy) {
    filtertBy.forEach((f) => {
      console.log(el.subCategoryId == f);
      if (el.subCategoryId == f) {
        this.newProductsFiltered.push(el);
      }
      if (el.ageId == f) {
        this.newProductsFiltered.push(el);
      }
      if (el.brandId == f) {
        this.newProductsFiltered.push(el);
      }
      if (el.genderId == f) {
        this.newProductsFiltered.push(el);
      }
      if (el.sale == f) {
        this.newProductsFiltered.push(el);
      }
    });
  }

  filterPrice(el) {
    console.log(el.price);
    console.log(this.fromPriceFilter);

    console.log(
      el.price >= this.fromPriceFilter && el.price <= this.toPriceFilter
    );
    if (el.price >= this.fromPriceFilter && el.price <= this.toPriceFilter) {
      console.log(el.price >= this.fromPriceFilter);
      this.newProductsFiltered.push(el);
    }
  }

  getProductsWithSale() {
    this.sale = undefined;
    const variables = {
      paginationOptions: {
        page: this.page,
        limit: this.limit,
      },
    };

    this.productSearchService.getOnSaleProducts(variables).subscribe(
      (res: any) => {
        this.sale = true;
        this.products = res.data.onSaleProducts;
        console.log('products', this.products);
        this.cloneProducts = [...this.products];
      },
      (errr) => {
        this.products = [];
      }
    );
  }

  getAges() {
    this.productSearchService.ages().subscribe((res: any) => {
      this.ages = res.data.ages;
      console.log('getAges', res);
    });
  }

  getBrands() {
    const variables = {
      paginationOptions: { limit: 10, page: 1 },
    };
    this.productSearchService.getBrands(variables).subscribe((res: any) => {
      this.brands = res.data.brands;
    });
  }

  getGenders() {
    const variables = {
      paginationOptions: {
        page: 1,
        limit: 3,
      },
    };

    this.productSearchService.genders(variables).subscribe((res: any) => {
      this.spinner.hide();
      this.genders = res.data.genders;
    });
  }

  goToCategoryProduct(id) {
    this.route.navigate(['/search'], { queryParams: { categoryId: id } });
  }

  goToSubCategoriesProducts(id) {
    this.route.navigate(['/search'], { queryParams: { subCategoryId: id } });
  }

  onScroll() {
    console.log('scrolled!!');
    this.limit = this.limit + 10;
    // console.log(this.filterSubCategoryForm.value.checkArray.length == 0);
    // console.log(this.filterSubCategoryForm);

    // if (this.filterSubCategoryForm.value.checkArray.length == 0)
      this.paginateProducts();
  }

  searchByKey(id) {
    const variables = {
      paginationOptions: {
        page: this.page,
        limit: this.limit,
      },
      similarProductInput: {
        productId: id,
      },
    };
    this.productSearchService.searchByProductId(variables).subscribe(
      (res: any) => {
        if (res.data.similarProducts) {
          this.products = res.data.similarProducts;
          console.log(this.products);
        }
      },
      (err) => {
        this.products = [];
      }
    );
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }


  clearQueryParam() {
    console.log('clearQueryParam')
    let snapshot = this.router?.snapshot;
    // const params = { ...snapshot.queryParams };
    // delete params.pos
if (snapshot?.queryParams?.categoryId || snapshot?.queryParams?.subCategoryId) {

} else {
  console.log('snapshot', snapshot);
  this.route.navigate([], { queryParams: {} });
}

  }

}
