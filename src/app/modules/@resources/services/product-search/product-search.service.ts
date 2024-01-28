import { Injectable } from '@angular/core';
import { QueryFull } from '@core/models/graph-models';
import { GraphFunctionsTypesInputs } from '@resources/graph-functions/graph-functions-types-inputs';
import { BaseServiceService } from 'src/app/modules/graphql/base-service/base-service.service';

@Injectable({
  providedIn: 'root',
})
export class ProductSearchService  extends GraphFunctionsTypesInputs{
  constructor(
    private baseServiceService: BaseServiceService
    ) {
    super()
  }

  getProductsBysubCategoryId(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCT_BY_SUB_CATEGORY;
    input.variable = this.INPUT_PRODUCT_BY_SUB_CATEGORY;
    input.type = this.TYPE_PRODUCT_BY_SUB_CATEGORY;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.PRODUCT;
    return this.baseServiceService.generalQueFull(input);
  }

  getBrands(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_BRANDS
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.BRANDS;
    return this.baseServiceService.generalQueFull(input);

  }

  getProductsByCategoryId(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCT_BY_CATEGORY;
    input.variable = this.INPUT_PRODUCT_BY_CATEGORY;
    input.type = this.TYPE_PRODUCT_BY_CATEGORY;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.PRODUCT;
    return this.baseServiceService.generalQueFull(input);
  }

  ages() {
    const input = {} as QueryFull;
    input.func = this.FUNC_AGES;
    input.return = this.AGES;
    return this.baseServiceService.generalQuery(input);
  }

  genders(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_GENDERS;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.SHOP_GENDER;
    return this.baseServiceService.generalQueFull(input);
  }

  getOnSaleProducts(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCT_ON_SALE
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.PRODUCT;
    return this.baseServiceService.generalQueFull(input);

  }

  getProductByKey(variables)  {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCT_SEARCH;
    input.variable = this.INPUT_PRODUCT_SEARCH;
    input.type = this.TYPE_PRODUCT_SEARCH;
    input.variables = variables;
    input.return = this.SEARCH;
    return this.baseServiceService.generalQueFull(input);
  }

  searchByProductId(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_SIMILAR;
    input.variable = this.INPUT_SIMILAR;
    input.type = this.TYPE_SIMILAR;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.PRODUCT;
    return this.baseServiceService.generalQueFull(input);
  }

  shopByGender(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCT_BY_GENDER;
    input.variable = this.INPUT_PRODUCT_BY_GENDER;
    input.type = this.TYPE_PRODUCT_BY_GENDER;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.PRODUCT;
    return this.baseServiceService.generalQueFull(input);
  }

  producstByBrandId(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCT_BY_BRAND;
    input.variable = this.INPUT_PRODUCT_BY_BRAND;
    input.type = this.TYPE_PRODUCT_BY_BRAND;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.PRODUCT;
    return this.baseServiceService.generalQueFull(input);

  }

  producstByAgeId(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCT_BY_AGE;
    input.variable = this.INPUT_PRODUCT_BY_AGE;
    input.type = this.TYPE_PRODUCT_BY_AGE;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.PRODUCT;
    return this.baseServiceService.generalQueFull(input);

  }

  filterProducts(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_FILTER;
    input.variable = this.INPUT_FILTER;
    input.type = this.TYPE_FILTER;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.FILTER;
    return this.baseServiceService.generalQueFull(input);
  }

  // searchProductsIds(variables) {
  //   const input = {} as QueryFull;
  //   input.func = this.FUNC_GET_PRODUCTS_IDS;
  //   input.variable = this.INPUT_GET_PRODUCTS_IDS;
  //   input.type = this.TYPE_GET_PRODUCTS_IDS;
  //   input.variables = variables;
  //   input.return = this.PRODUCT;
  //   return this.baseServiceService.generalQueFull(input);
	// }

  searchProductWithWord(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_GET_PRODUCTS_SEARCH;
    input.variable = this.INPUT_GET_PRODUCTS_SEARCH;
    input.type = this.TYPE_GET_PRODUCTS_SEARCH;
    input.variables = variables;
    input.return = this.PRODUCT;
    return this.baseServiceService.generalQueFull(input);
  }

}



