import { ConstituentGasesViewModel } from "../constituentGasesViewModel";
import { EmissionFactorViewModel } from "../emissionFactorViewModel";

export class EmissionFactorEstimateViewModel {
  co2e: number;
  co2e_unit: string;
  co2e_calculation_method: string;
  co2e_calculation_origin: string;
  emission_factor: EmissionFactorViewModel;
  constituent_gases: ConstituentGasesViewModel;

  error: string;
  error_code: string;
  message: string;

}
