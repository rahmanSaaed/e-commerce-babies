

export  interface QueryBase {
  func: String;
  return: String;
}

export interface QueryFull {
  func: String,
  return: any,
  variable?: string,
  type?: String,
  paginatioin?: any,
  paginatioinType?: String,
  variables?: any,
  data?: any;
}

// export interface MutationBase {
//   func: String;
//   return: String;
//   variable: string,
//   type?: String,
//   data?: String,
//   variables?: any;
// }

// export interface QueryPagination {
//   func: String;
//   return: String;
//   paginatioin?: any,
//   paginatioinType?: String,
//   variables?: any;
// }



