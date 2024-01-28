import { Injectable } from '@angular/core';
import { QueryFull } from '@core/models/graph-models';
import { GraphFunctionsTypesInputs } from '@resources/graph-functions/graph-functions-types-inputs';
import { BaseServiceService } from 'src/app/modules/graphql/base-service/base-service.service';

@Injectable({
  providedIn: 'root',
})
export class AccInfoService extends GraphFunctionsTypesInputs {
  constructor(private baseServiceService: BaseServiceService) {
    super();
  }

  getBuyer() {
    const input = {} as QueryFull;
    input.func = this.FUNC_BUYER;
    input.return = this.BUYER;
    return this.baseServiceService.generalQuery(input);
  }

  validateUserByLogin(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_SIGNIN;
    input.variable = this.INPUT_SIGNIN;
    input.type = this.TYPE_SIGNIN;
    input.variables = variables;
    input.return = this.TOKEN;
    return this.baseServiceService.generalMutationFull(input);
  }

  updateBuyer(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_UPDATE_BUYER;
    input.variable = this.INPUT_UPDATE_BUYER;
    input.type = this.TYPE_UPDATE_BUYER;
    input.variables = variables;
    input.return = this.BUYER;
    return this.baseServiceService.generalMutationFull(input);
  }

  updatePassword(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_CHANGE_PASS;
    input.variable = this.INPUT_CHANGE_PASS;
    input.type = this.TYPE_CHANGE_PASS;
    input.variables = variables;
    input.return = this.MESSAGE;
    return this.baseServiceService.generalMutationFull(input);
  }

  changeEmailRequest(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_RESET_EMAIL;
    input.variable = this.INPUT_RESET_EMAIL;
    input.type = this.TYPE_RESET_EMAIL;
    input.variables = variables;
    input.return = this.MESSAGE;
    return this.baseServiceService.generalMutationFull(input);
  }
}
