import { ClimatiqAPIResponseViewModel } from "../climatiqAPIResponseViewModel";
import { SearchResponsePossibleFiltersViewModel } from "./searchResponsePossibleFiltersViewModel";
import { SearchResponseResultsViewModel } from "./searchResponseResultsViewModel";

export class SearchResponseViewModel extends ClimatiqAPIResponseViewModel {
  current_page: number;
  last_page: number;
  total_results: number;
  results: SearchResponseResultsViewModel[];
  possible_filters: SearchResponsePossibleFiltersViewModel[];
}
