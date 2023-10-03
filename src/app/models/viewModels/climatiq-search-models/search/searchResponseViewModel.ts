import { SearchResponsePossibleFiltersViewModel } from "./searchResponsePossibleFiltersViewModel";
import { SearchResponseResultsViewModel } from "./searchResponseResultsViewModel";

export class SearchResponseViewModel {
  current_page: number;
  last_page: number;
  total_results: number;
  results: SearchResponseResultsViewModel[];
  possible_filters: SearchResponsePossibleFiltersViewModel[];

  error: string;
  error_code: string;
  message: string;
}
