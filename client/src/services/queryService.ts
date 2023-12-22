import QueryParams from "../interfaces/QueryParams";

export function getQueryParams(
  page?: number,
  limit?: number,
  sort?: string,
  search?: string,
  genre?: string,
  category?: string,
  steamspy_tag?: string,
  platform?: string,
  price?: string
): QueryParams {
  return {
    
    page,
    limit,
    sort,
    search,
    genre,
    category,
    steamspy_tag,
    platform,
    price,
  };
}

// export function getQueryParams(params : any) : QueryParams {
//     let queryParams : any = {};
//     for (let key in params) {
//         if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
//           queryParams[key] = params[key];
//         }
//       }
//   return params;
// }