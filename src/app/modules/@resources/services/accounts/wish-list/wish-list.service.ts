import { Injectable } from '@angular/core';
import { QueryFull } from '@core/models/graph-models';
import { GraphFunctionsTypesInputs } from '@resources/graph-functions/graph-functions-types-inputs';
import { Mutation } from '@resources/mutations/mutations';
import { Queries } from '@resources/queries/queries';
import { Apollo } from 'apollo-angular';
import { BaseServiceService } from 'src/app/modules/graphql/base-service/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class WishListService extends GraphFunctionsTypesInputs  {

  constructor(
    private baseServiceService: BaseServiceService
  ) {
    super()
  }



  getWishList() {
    const input = {} as QueryFull;
    input.func = this.GET_FAVORITES;
    input.return = this.FAVORITES;
    return this.baseServiceService.generalQuery(input);

  }

  addFavorite(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_ADD_TO_FAVORITES;
    input.variable = this.INPUT_ADD_TO_FAVORITES;
    input.type = this.TYPE_ADD_TO_FAVORITES;
    input.return = this.FAVORITES;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);

  }

  deleteBuyerWithoutInputVar(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_DELETE_FAVE;
    input.variable = this.INPUT_DELETE_FAVE;
    input.type = this.TYPE_DELETE_FAVE;
    input.return = this.MESSAGE;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }

}
