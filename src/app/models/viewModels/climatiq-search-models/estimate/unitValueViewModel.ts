export class UnitValueViewModel {
  name: string;
  value_parameter_name: string;
  dropdownUnits: string[] = [];

  selectedUnit: string;
  inputValue: number;


  constructor(_name: string, _value_parameter_name: string, _dropdownValues : string[]) {
    this.name = _name;
    this.value_parameter_name = _value_parameter_name;
    this.dropdownUnits = _dropdownValues;
  }
}
