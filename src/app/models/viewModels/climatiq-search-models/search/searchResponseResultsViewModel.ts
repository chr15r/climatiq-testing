import { ConstituentGasesViewModel } from "../constituentGasesViewModel";


export class SearchResponseResultsViewModel {
  id: string;
  activity_id: string;
  access_type: string;
  name: string;
  category: string;
  sector: string;
  source: string;
  source_link: string;
  uncertainty: number;
  year: number;
  year_released: number;
  region: string;
  region_name: string;
  description: string;
  unit_type: string;
  unit: string;
  source_lca_activity: string;
  supported_calculation_methods: string[];
  factor: number;
  factor_calculation_method: string;
  factor_calculation_origin: string;
  constituent_gases: ConstituentGasesViewModel[];
  value: number;
}
