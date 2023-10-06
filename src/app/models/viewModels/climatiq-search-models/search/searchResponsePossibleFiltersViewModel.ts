export class SearchResponsePossibleFiltersViewModel {
  year: number[];
  source: { source: string, datasets: string[] }[];
  region : { id: string, name: string[] }[];
  category: string[];
  sector: string;
  unit_type: string[];
  source_lca_activity: string[];
  access_type: string[];
  data_quality_flags: string[];
}
