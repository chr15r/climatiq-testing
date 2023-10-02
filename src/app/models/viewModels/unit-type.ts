import { Unit } from "./unit";

export class UnitType {
  unit_type: string;
  units: Unit[];

  constructor(unit_type: string, units:  Unit[]) {
    this.unit_type = unit_type;
    this.units = units;
  }
}
