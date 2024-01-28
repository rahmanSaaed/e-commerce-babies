import { Injectable } from '@angular/core';
import { QueryFull } from '@core/models/graph-models';
import { GraphFunctionsTypesInputs } from '@resources/graph-functions/graph-functions-types-inputs';
import { BaseServiceService } from 'src/app/modules/graphql/base-service/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class BlogsService extends GraphFunctionsTypesInputs{

  constructor(
    private baseServiceService: BaseServiceService

    ) {
      super()
     }


  getBlogs(variables?) {
    const input = {} as QueryFull;
    input.func = this.FUNC_BLOGS;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.return = this.BLOGS;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
  }


  getBlog(variables?) {
    const input = {} as QueryFull;
    input.func = this.FUNC_BLOG;
    input.variable = this.INPUT_BLOG;
    input.type = this.TYPE_BLOG;
    input.return = this.BLOG;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
  }

  getSitting() {
    const input = {} as QueryFull;
    input.func = this.FUNC_SETTING;
    input.return = this.SETTING;
    return this.baseServiceService.generalQuery(input);
  }

}
