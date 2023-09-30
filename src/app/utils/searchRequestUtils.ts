import { SearchRequestViewModel } from "../models/viewModels/climatiq-search-models/searchRequestViewModel";

export class SearchRequestUtils {

  public static getQueryString(searchRequest: SearchRequestViewModel) {
    return `region=${searchRequest.region}&year=${searchRequest.year}&sector=${searchRequest.sector}&category=${searchRequest.category}`;
  }

}
