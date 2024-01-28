import { Injectable } from '@angular/core';
import { QueryFull } from '@core/models/graph-models';
import { GraphFunctionsTypesInputs } from '@resources/graph-functions/graph-functions-types-inputs';
import { Queries } from '@resources/queries/queries';
import { Apollo } from 'apollo-angular';
import { BaseServiceService } from 'src/app/modules/graphql/base-service/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService extends GraphFunctionsTypesInputs {

  constructor(private apollo: Apollo,
    private baseServiceService: BaseServiceService
    ) {
    super()

  }



  aboutUs() {
    const input = {} as QueryFull;
    input.func = this.FUNC_ABOUT;
    input.return = this.ABOUT;
    return this.baseServiceService.generalQuery(input);
  }

  whyShopWithUs() {
    const input = {} as QueryFull;
    input.func = this.FUNC_WHY_SHOP_WITH_US;
    input.return = this.WHY_SHOP_WITH_US;
    return this.baseServiceService.generalQuery(input);
  }

}

//
