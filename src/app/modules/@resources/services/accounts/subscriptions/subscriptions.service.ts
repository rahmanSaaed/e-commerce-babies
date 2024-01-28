import { Injectable } from '@angular/core';
import { QueryFull } from '@core/models/graph-models';
import { GraphFunctionsTypesInputs } from '@resources/graph-functions/graph-functions-types-inputs';

import { BaseServiceService } from 'src/app/modules/graphql/base-service/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService extends GraphFunctionsTypesInputs {

  constructor(
    private baseServiceService: BaseServiceService
    ) {
      super();
    }

  getSubscription() {
    const input = {} as QueryFull;
    input.func = this.FUNC_BUYER_SUBSCRIPTION;
    input.return = this.IS_SUBSCRIPED;
    return this.baseServiceService.generalQuery(input);
  }

  createBuyerSubscription() {
    const input = {} as QueryFull;
    input.func = this.FUNC_UYER_SUBSCRIPTION;
    input.return = this.MESSAGE;
    return this.baseServiceService.generalMutation(input);
  }

  deleteBuyerSubScription() {
    const input = {} as QueryFull;
    input.func = this.FUNC_DELETE_UYER_SUBSCRIPTION;
    input.return = this.MESSAGE;
    return this.baseServiceService.generalMutation(input);
  }

  createSubscription(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_GUEST_SUBSCRIPTION;
    input.variable = this.INPUT_SUBSCRIPTION;
    input.type = this.TYPE_SUBSCRIPTION;
    input.variables = variables;
    input.return = this.MESSAGE;
    return this.baseServiceService.generalMutationFull(input);
  }

  deleteSubScription(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_DELETE_SUBSCRIPTION;
    input.variable = this.INPUT_DELETE_SUBSCRIPTION;
    input.type = this.TYPE_DELETE_SUBSCRIPTION;
    input.variables = variables;
    input.return = this.MESSAGE;
    return this.baseServiceService.generalMutationFull(input);
  }

}
