import { Mutation } from '@resources/mutations/mutations';
import { Injectable } from '@angular/core';
import { Queries } from '@resources/queries/queries';
import { Apollo } from 'apollo-angular';
import { QueryFull } from '@core/models/graph-models';
import { GraphFunctionsTypesInputs } from '@resources/graph-functions/graph-functions-types-inputs';
import { BaseServiceService } from 'src/app/modules/graphql/base-service/base-service.service';

@Injectable({
	providedIn: 'root'
})
export class ReviewsService extends GraphFunctionsTypesInputs{

  constructor(private apollo: Apollo,
    private baseServiceService: BaseServiceService
    ) {
    super();
  }

	reviews() {
    const input = {} as QueryFull;
    input.func = this.FUNC_BUYER_REVIEWS;
    input.return = this.BUYER_REVIEWS;
    return this.baseServiceService.generalQuery(input);
	}

	updateReview(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_BUYER_UPDATE_REVIEWS;
    input.variable = this.INPUT_BUYER_UPDATE_REVIEWS;
    input.type = this.TYPE_BUYER_UPDATE_SUBSCRIPTION;
    input.variables = variables;
    input.return = this.REVIEW_ID;
    return this.baseServiceService.generalMutationFull(input);
  }

  createReview(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_CREATE_REVIEW;
    input.variable = this.INPUT_CREATE_REVIEW;
    input.type = this.TYPE_CREATE_REVIEW;
    input.variables = variables;
    input.return = this.REVIEW_ID;
    return this.baseServiceService.generalMutationFull(input);
	}

	deleteReview(variables) {
    const input = {} as QueryFull;
    input.func = this.FUNC_BUYER_DELETE_REVIEWS;
    input.variable = this.INPUT_BUYER_DELETE_REVIEWS;
    input.type = this.TYPE_BUYER_DELETE_REVIEWS;
    input.variables = variables;
    input.return = this.MESSAGE;
    return this.baseServiceService.generalMutationFull(input);
	}

}
