import { ClimatiqAPIResponseViewModel } from "../climatiqAPIResponseViewModel";
import { ConstituentGasesViewModel } from "../constituentGasesViewModel";
import { EmissionFactorViewModel } from "../emissionFactorViewModel";

export class EmissionFactorEstimateViewModel extends ClimatiqAPIResponseViewModel {
  co2e: number;
  co2e_unit: string;
  co2e_calculation_method: string;
  co2e_calculation_origin: string;
  emission_factor: EmissionFactorViewModel;
  constituent_gases: ConstituentGasesViewModel;
}
