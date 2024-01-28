import { Injectable } from '@angular/core';
import { QueryFull } from '@core/models/graph-models';
import { GraphFunctionsTypesInputs } from '@resources/graph-functions/graph-functions-types-inputs';
import { BaseServiceService } from 'src/app/modules/graphql/base-service/base-service.service';

@Injectable({
	providedIn: 'root'
})
export class ProductsService  extends GraphFunctionsTypesInputs {

	constructor(
    private baseServiceService: BaseServiceService

	) {
    super()
  }


	getProductDetail(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCT_DETAIL;
    input.variable = this.INPUT_PRODUCT_DETAIL;
    input.type = this.TYPE_PRODUCT_DETAIL;
    input.return = this.PRODUCT_DETAIL;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
	}

	getProductRelated(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_RELATED;
    input.variable = this.INPUT_PRODUCT_BY_SUB_CATEGORY;
    input.type = this.TYPE_PRODUCT_BY_SUB_CATEGORY;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.return = this.RELATED;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
	}

	getProductReviews(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_PRODUCT_REVIEW;
    input.variable = this.INPUT_PRODUCT_REVIEW;
    input.type = this.TYPE_PRODUCT_RELATED;
    input.return = this.PRODUCT_REVIEWS;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
	}

}
