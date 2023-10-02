import { Component, Input, OnInit } from '@angular/core';
import { EmissionFactorEstimateAdditionalParameterViewModel } from 'src/app/models/viewModels/climatiq-search-models/estimate/emissionFactorEstimateAdditionalParameterViewModel';
import { EmissionFactorEstimateUnitValueViewModel } from 'src/app/models/viewModels/climatiq-search-models/estimate/emissionFactorEstimateUnitValueViewModel';
import { SearchResponseResultsViewModel } from 'src/app/models/viewModels/climatiq-search-models/search/searchResponseResultsViewModel';
import { Unit } from 'src/app/models/viewModels/unit';
import { UnitType } from 'src/app/models/viewModels/unit-type';

@Component({
  selector: 'app-climatiq-search-response-emission-factor',
  templateUrl: './climatiq-search-response-emission-factor.component.html',
  styleUrls: ['./climatiq-search-response-emission-factor.component.scss']
})
export class ClimatiqSearchResponseEmissionFactorComponent implements OnInit {

  @Input() searchResponseResult: SearchResponseResultsViewModel;
  @Input() unitTypes: UnitType[];

  public availableUnits: Unit[] = [];

  public additionalParameter: EmissionFactorEstimateAdditionalParameterViewModel;
  public unitValues: EmissionFactorEstimateUnitValueViewModel[] = [];

  ngOnInit(): void {
    this.loadAvailableUnits();
  }


  loadAvailableUnits() {
    let unitType: UnitType = this.unitTypes.find(u => u.unit_type === this.searchResponseResult.unit_type)!;
    this.availableUnits = unitType.units;

    if(unitType.additional_parameter_name !== undefined) {
      this.additionalParameter = new EmissionFactorEstimateAdditionalParameterViewModel(unitType.additional_parameter_name);
    }

    this.availableUnits.forEach(u => {
      this.unitValues.push(new EmissionFactorEstimateUnitValueViewModel(u.name, u.value_parameter_name, u.values));
    });
  }

  estimateDataValid() {
    return this.unitValuesValid() && (this.additionalParameter === undefined  ||
          (this.additionalParameter !== undefined && this.additionalParameter.value !== undefined));
  }

  unitValuesValid(): boolean {
    let invalidUnits: number = 0;
    this.unitValues.forEach(u => {
      if(!this.unitValueIsValid(u))
        invalidUnits += 1;
    })
    return invalidUnits > 0 ? false : true;
  }

  unitValueIsValid(u: EmissionFactorEstimateUnitValueViewModel): boolean {
    return u.selectedUnit?.length > 0 && u.inputValue?.toString().length > 0;
  }

  getFormattedString(s: string) {
    return s.replace("_"," ");
  }
}
