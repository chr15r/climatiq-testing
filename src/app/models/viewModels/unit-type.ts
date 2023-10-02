import { Unit } from "./unit";

export class UnitType {
  unit_type: string;
  additional_parameter_name: string;
  units: Unit[];

  constructor(unit_type: string, additional_parameter_name: string, units:  Unit[]) {
    this.unit_type = unit_type;
    this.additional_parameter_name = additional_parameter_name;
    this.units = units;
  }
}
