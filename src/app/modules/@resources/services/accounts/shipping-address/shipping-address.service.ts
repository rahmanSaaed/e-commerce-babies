import { Injectable } from '@angular/core';
import { QueryFull } from '@core/models/graph-models';
import { GraphFunctionsTypesInputs } from '@resources/graph-functions/graph-functions-types-inputs';
import { BaseServiceService } from 'src/app/modules/graphql/base-service/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class ShippingAddressService extends GraphFunctionsTypesInputs{

  constructor(
    private baseServiceService: BaseServiceService
    ) {
      super()
     }



  getAdress() {
    const input = {} as QueryFull;
    input.func = this.FUNC_USER_ADDRESS;
    input.return = this.ADRESS;
    return this.baseServiceService.generalQuery(input);
  }

  getCities() {
    const input = {} as QueryFull;
    input.func = this.FUNC_CITIES;
    input.return = this.CITIES;
    return this.baseServiceService.generalQuery(input);
  }

  updateAdress(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_UPDATE_ADDRESS;
    input.variable = this.INPUT_UPDATE_ADDRESS;
    input.type = this.TYPE_UPDATE_ADDRESS
    input.return = this.ADRESS;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }

  addAdress(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_ADD_ADDRESS;
    input.variable = this.INPUT_ADD_ADDRESS;
    input.type = this.TYPE_ADD_ADDRESS
    input.return = this.ADRESS;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);
  }


  deleteAddress(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_DELETE_ADDRESS;
    input.variable = this.INPUT_DELETE_ADDRESS;
    input.type = this.TYPE_DELETE_ADDRESS
    input.return = this.MESSAGE;
    input.variables = variables;
    return this.baseServiceService.generalQueFull(input);
  }

  getAdressType() {
    const input = {} as QueryFull;
    input.func = this.FUNC_GET_ADDRESS_TYPES;
    input.return = this.ADDRESS_TYPE;
    return this.baseServiceService.generalQuery(input);
  }


}
