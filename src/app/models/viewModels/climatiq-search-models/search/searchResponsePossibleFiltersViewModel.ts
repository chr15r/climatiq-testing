import { SearchResponseRegionViewModel } from "./searchResponseRegionViewModel";
import { SearchResponseSourceViewModel } from "./searchResponseSourceViewModel";

export class SearchResponsePossibleFiltersViewModel {
  year: number[];
  source: SearchResponseSourceViewModel[];
  region : SearchResponseRegionViewModel[];
  category: string[];
  sector: string;
  unit_type: string[];
  source_lca_activity: string[];
  access_type: string[];
  data_quality_flags: string[];
}
