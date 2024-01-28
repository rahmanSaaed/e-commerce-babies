import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { QueryFull } from '@core/models/graph-models';
import { GraphFunctionsTypesInputs } from '@resources/graph-functions/graph-functions-types-inputs';
import { Mutation } from '@resources/mutations/mutations';
import { Queries } from '@resources/queries/queries';
import { Apollo } from 'apollo-angular';
import { BaseServiceService } from 'src/app/modules/graphql/base-service/base-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends GraphFunctionsTypesInputs {



  constructor(private apollo: Apollo, private route: Router,
    private baseServiceService: BaseServiceService
    ) {
    super()
  }

  register(variables) {
    this.input.func = this.FUNC_SIGNIN_UP
    this.input.return = this.BUYER_ID
    this.input.type = this.TYPE_SIGNIN_UP;
    this.input.variable = this.INPUT_SIGNIN_UP;
    this.input.variables = variables;
    return this.baseServiceService.generalMutationFull(this.input);
  }

  login(variables) {
    this.input.func = this.FUNC_SIGNIN;
    this.input.return = this.TOKEN;
    this.input.type = this.TYPE_SIGNIN;
    this.input.variable = this.INPUT_SIGNIN;
    this.input.variables = variables;
    return  this.baseServiceService.generalMutationFull(this.input);

  }

  forgetPassword(variables) {
    this.input.func = this.FUNC_FORGET_PASS;
    this.input.return = this.MESSAGE;
    this.input.type = this.TYPE_FORGET_PASS;
    this.input.variable = this.INPUT_FORGET_PASS;
    this.input.variables = variables;
    return this.baseServiceService.generalMutationFull(this.input);
  }

  resetPassword(variables) {
    this.input.func = this.FUNC_RESET_PASS;
    this.input.return = this.MESSAGE;
    this.input.type = this.TYPE_RESET_PASS;
    this.input.variable = this.INPUT_RESET_PASS;
    this.input.variables = variables;
    return this.baseServiceService.generalMutationFull(this.input);
  }

  activateUser(variables) {
    this.input.func = this.FUNC_ACTIVATE_BUYER;
    this.input.return = this.MESSAGE;
    this.input.type = this.TYPE_ACTIVATE_BUYER;
    this.input.variable = this.INPUT_ACTIVATE_BUYER;
    this.input.variables = variables;
    return this.baseServiceService.generalMutationFull(this.input);
  }

  activateChangeEmail(variables) {
    this.input.func = this.FUNC_CHANGE_EMAIL;
    this.input.return = this.MESSAGE;
    this.input.type = this.TYPE_CHANGE_EMAIL;
    this.input.variable = this.INPUT_CHANGE_EMAIL;
    this.input.variables = variables;
    return this.baseServiceService.generalMutationFull(this.input);
  }

  resendActivationMail(variables) {
    this.input.func = this.FUNC_RESEND_ACTIVATION;
    this.input.return = this.MESSAGE;
    this.input.type = this.TYPE_RESEND_ACTIVATION;
    this.input.variable = this.INPUT_RESEND_ACTIVATION;
    this.input.variables = variables;
    return this.baseServiceService.generalMutationFull(this.input);

  }


  validateLoginToken() {
    this.input.func = this.FUNC_VALIDATE_TOKEN;
    this.input.return = this.MESSAGE;
    return this.baseServiceService.generalMutation(this.input);
  }

  // validateToken(token) {
  //   return this.apollo.query({
  //     query: Queries.VALIDATE_TOKEN,
  //     variables: {
  //       token: token,
  //     },
  //   });
  // }

  // getTokenAndValidate() {
  //   const token = localStorage.getItem('AUTH_TOKEN');

  //   if (token) {
  //     const valid = this.validateTokens(token);
  //     console.log('valid', valid);
  //     return true;
  //   } else {
  //     console.log('no token');
  //     return false;

  //   }
  // }

  // validateTokens(token) {
  //   this.validateToken(token).subscribe(
  //     (res) => {
  //       console.log(res);
  //       if (res) {
  //         return true;
  //       }
  //     },
  //     (err) => {
  //       console.log('errr token', err);
  //       localStorage.removeItem('AUTH_TOKEN');
  //     }
  //   );
  // }

  logOut() {
    localStorage.clear();
    this.route.navigate(['/']);
  }
}
