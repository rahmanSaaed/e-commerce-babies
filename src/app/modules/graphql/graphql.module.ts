import { environment } from './../../../environments/environment';
import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, DefaultOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { onError } from "@apollo/client/link/error";
import { ToastrService } from 'ngx-toastr';
import { setContext } from '@apollo/client/link/context';

const uri = environment.url;

export function createApollo(httpLink: HttpLink, toastService: ToastrService) {

  // const errorLink = onError(({ graphQLErrors, networkError }) => {
  //   if (graphQLErrors)
  //     graphQLErrors.map(({ extensions, locations, path }) => {
  //       if (graphQLErrors) {
  //         if (graphQLErrors[0].extensions.exception.response.message) {

  //           if (Array.isArray(graphQLErrors[0].extensions.exception.response.message)) {
  //             const errArr = [...graphQLErrors[0].extensions.exception.response.message];
  //             errArr.forEach(element => {
  //               toastService.error(`${element}`);
  //             });
  //           } else {
  //             toastService.error(`${graphQLErrors[0].extensions.exception.response.message}`);
  //           }
  //         } else {
  //           // toastService.error(`${networkError}`);
  //         }
  //       }
  //     });
  // });

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('AUTH_TOKEN');

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      };
    }
  });

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'none',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'none',
    },
  }

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  // const link = ApolloLink.from([basic, auth, (errorLink as unknown) as ApolloLink, httpLink.create({ uri })]);
  const cache = new InMemoryCache();


  return {
    link,
    cache,
    defaultOptions: defaultOptions,

  }
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, ToastrService],
    },
  ],
})
export class GraphQLModule { }

// this.localStorage.set('AUTH_TOKEN', data.data.signIn.accessToken);
// export function createApollo(httpLink: HttpLink, toastService: ToastrService): ApolloClientOptions<any> {

// 	const errorLink = onError(({ graphQLErrors, networkError }) => {
// 		if (graphQLErrors)
//       graphQLErrors.map(({ extensions, locations, path }) => {
//         if (graphQLErrors) {
//           if (graphQLErrors[0].extensions.exception.response.message) {

//             if (Array.isArray(graphQLErrors[0].extensions.exception.response.message)) {
//             const errArr = [...graphQLErrors[0].extensions.exception.response.message];
//             errArr.forEach(element => {
//               toastService.error(`${element}`);
//             });
//           } else {
//             toastService.error(`${graphQLErrors[0].extensions.exception.response.message}`);
//           }
//           } else {
//             toastService.error(`${networkError}`);
//           }
//         }
//       });
//   });

//   const token = localStorage.getItem('AUTH_TOKEN');
//   const link = httpLink.create({ uri,
//       headers: {
//         Authorization:  token ? `Bearer ${token}` : ''
//       }
//   });
// 	return {
// 		link: errorLink.concat(link),
// 		cache: new InMemoryCache(),
// 	};
// }
