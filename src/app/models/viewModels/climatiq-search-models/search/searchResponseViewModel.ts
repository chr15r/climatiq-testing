import { ClimatiqAPIResponseViewModel } from "../climatiqAPIResponseViewModel";
import { EmissionFactorViewModel } from "./emissionFactorViewModel";
import { SearchResponsePossibleFiltersViewModel } from "./searchResponsePossibleFiltersViewModel";

export class SearchResponseViewModel extends ClimatiqAPIResponseViewModel {
  current_page: number;
  last_page: number;
  total_results: number;
  results: EmissionFactorViewModel[];
  possible_filters: SearchResponsePossibleFiltersViewModel[];
}
