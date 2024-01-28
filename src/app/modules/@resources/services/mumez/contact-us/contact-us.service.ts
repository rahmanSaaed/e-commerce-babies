import { Injectable } from '@angular/core';
import { QueryFull } from '@core/models/graph-models';
import { GraphFunctionsTypesInputs } from '@resources/graph-functions/graph-functions-types-inputs';
import { Mutation } from '@resources/mutations/mutations';
import { Apollo } from 'apollo-angular';
import { BaseServiceService } from 'src/app/modules/graphql/base-service/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService extends GraphFunctionsTypesInputs{

  constructor(
    private baseServiceService: BaseServiceService
    ) {
      super()
   }

  createContact(variables?) {
    const input = {} as QueryFull;
    input.func = this.FUNC_CREATE_CONTACT
    input.return = this.MESSAGE
    input.type = this.TYPE_CREATE_CONTACT;
    input.variable = this.INPUT_CREATE_CONTACT;
    input.variables = variables;
    return this.baseServiceService.generalMutationFull(input);

  }



}
