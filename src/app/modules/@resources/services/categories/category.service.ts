import { Injectable } from '@angular/core';
import { QueryFull } from '@core/models/graph-models';
import { GraphFunctionsTypesInputs } from '@resources/graph-functions/graph-functions-types-inputs';
import { BaseServiceService } from 'src/app/modules/graphql/base-service/base-service.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends GraphFunctionsTypesInputs {
  constructor(private baseServiceService: BaseServiceService) {
    super();
  }

  getCategories(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_CATEGORIES;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.return = this.CATEGORIES;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
  }

  getCategoryById(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_CATEGORY_BY_ID;
    input.variable = this.INPUT_CATEGORY_BY_ID;
    input.type = this.TYPE_CATEGORY_BY_ID;
    input.variables = variables;
    input.return = this.CATEGORY_NAME;
    return this.baseServiceService.generalQueFull(input);
  }

  getSubCategoryBySubCategoryId(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_SUB_CATEGORY_BY_ID;
    input.variable = this.INPUT_SUB_CATEGORY_BY_ID;
    input.type = this.TYPE_SUB_CATEGORY_BY_ID;
    input.variables = variables;
    input.return = this.SUB_CATEGORY_NAME;
    return this.baseServiceService.generalQueFull(input);
  }

  getSubCategoryByCategoryId(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_SUB_CATEGORY_BY_CATEGORY_ID;
    input.variable = this.INPUT_SUB_CATEGORY_BY_CATEGORY_ID;
    input.type = this.TYPE_SUB_CATEGORY_BY_CATEGORY_ID;
    input.variables = variables;
    input.return = this.SUB_CATEGORY_NAME;
    return this.baseServiceService.generalQueFull(input);
  }
}
