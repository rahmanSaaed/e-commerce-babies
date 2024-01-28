import { Injectable } from '@angular/core';
import { QueryFull } from '@core/models/graph-models';
import { GraphFunctionsTypesInputs } from '@resources/graph-functions/graph-functions-types-inputs';
import { BaseServiceService } from 'src/app/modules/graphql/base-service/base-service.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService extends GraphFunctionsTypesInputs {
  constructor(private baseServiceService: BaseServiceService) {
    super();
  }

  getSlider() {
    const input = {} as QueryFull;
    input.func = this.FUNC_SLIDER;
    input.return = this.SLIDER;
    return this.baseServiceService.generalQuery(input);
  }

  getAges() {
    const input = {} as QueryFull;
    input.func = this.FUNC_AGES;
    input.return = this.AGES;
    return this.baseServiceService.generalQuery(input);
  }

  popularCategory() {
    const input = {} as QueryFull;
    input.func = this.FUNC_POPULAR_CATEGORIES;
    input.return = this.POPULAR_CATEGORY;
    return this.baseServiceService.generalQuery(input);
  }

  getPopularSubCategory(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_POPULAR_SUB_CATEGORIES;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.POPULAR_SUB_CATEGORY;
    return this.baseServiceService.generalQueFull(input);
  }

  getNewArrivals(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_NEW_ARRIVALS;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.NEW_ARRIVALS;
    return this.baseServiceService.generalQueFull(input);
  }

  getBckgroundFun(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_BACK_GROUND_FUN;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.BACK_GROUND_FUN;
    return this.baseServiceService.generalQueFull(input);
  }

  shopByGender(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_GENDERS;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.SHOP_GENDER;
    return this.baseServiceService.generalQueFull(input);
  }

  getBrands(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_BRANDS;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.BRANDS;
    return this.baseServiceService.generalQueFull(input);
  }

  getProductsWeLove(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCTS_WE_LOVE;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.PRODUCT_WE_LOVE;
    return this.baseServiceService.generalQueFull(input);
  }

  getProductsTrending(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCTS_TRENDING;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.PRODUCT_WE_LOVE;
    return this.baseServiceService.generalQueFull(input);
  }
}
