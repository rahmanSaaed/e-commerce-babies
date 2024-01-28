import { Injectable } from '@angular/core';
import { QueryFull } from '@core/models/graph-models';
import { GraphFunctionsTypesInputs } from '@resources/graph-functions/graph-functions-types-inputs';
import { BaseServiceService } from 'src/app/modules/graphql/base-service/base-service.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends GraphFunctionsTypesInputs {
  constructor(private baseServiceService: BaseServiceService) {
    super();
  }

  createOrders(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_CREATE_ORDER;
    input.variable = this.INPUT_ORDER;
    input.type = this.TYPE_CREATE_ORDER;
    input.return = this.ORDER;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }

  getOrders(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_GET_ORDERS;
    input.paginatioin = this.INPUT_PAGINATION;
    input.paginatioinType = this.TYPE_PAGINATION;
    input.variables = variables;
    input.return = this.ORDERS;
    return this.baseServiceService.generalQueFull(input);
  }

  getOrder(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_GET_ORDER;
    input.variable = this.INPUT_GET_ORDER;
    input.type = this.TYPE_GET_ORDER;
    input.variables = variables;
    input.return = this.ORDER_DETAIL;
    return this.baseServiceService.generalQueFull(input);
  }

  trackOrder(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_TRACK_ORDER;
    input.variable = this.INPUT_TRACK_ORDER;
    input.type = this.TYPE_TRACK_ORDER;
    input.variables = variables;
    input.return = this.TRACK_ORDER;
    return this.baseServiceService.generalQueFull(input);
  }

  orderStatus() {
    const input = {} as QueryFull;
    input.func = this.FUNC_ORDER_STATUS;
    input.return = this.ORDER_STATUS;
    return this.baseServiceService.generalQuery(input);
  }
}
