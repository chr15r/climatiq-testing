export class EmissionFactorEstimateUnitValueViewModel {
  name: string;
  dropdownUnits: string[] = [];

  selectedUnit: string;
  inputValue: number;


  constructor(_name: string, _dropdownValues : string[]) {
    this.name = _name;
    this.dropdownUnits = _dropdownValues;
  }
}
