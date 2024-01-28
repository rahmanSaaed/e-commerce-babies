import { Injectable } from '@angular/core';
import { QueryFull } from '@core/models/graph-models';
import { Apollo } from 'apollo-angular';
import { BaseQuery } from '../base-query/base-query';

@Injectable({
  providedIn: 'root',
})
export class BaseServiceService {
  constructor(
    private baseQuery: BaseQuery,
     private apollo: Apollo
     ) {}

  generalQuery(input: QueryFull) {
    return this.apollo.query({
      query: this.baseQuery.generalQuery(input),
    });
  }

  generalQueFull(input: QueryFull) {
    return this.apollo.query({
      query: this.baseQuery.generalQueryFull(input),
      variables: input.variables,
    });
  }

  generalMutationFull(input: QueryFull) {
    return this.apollo.mutate({
      mutation: this.baseQuery.generalMutationFull(input),
      variables: input.variables,
    });
  }

  generalMutation(input: QueryFull) {
    return this.apollo.mutate({
      mutation: this.baseQuery.generalMutation(input),
      variables: input.variables,
    });
  }

}
