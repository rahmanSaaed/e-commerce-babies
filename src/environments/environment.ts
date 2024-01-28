// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
  url: 'https://api.mumez.com/graphql',
  // url: 'http://157.230.124.1/graphql',
  // url: 'http://3.124.63.131:90/graphql/',
  port: 8200
};

// 157.230.124.1:90/graphql
// http://3.124.63.131:90/graphql/
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
