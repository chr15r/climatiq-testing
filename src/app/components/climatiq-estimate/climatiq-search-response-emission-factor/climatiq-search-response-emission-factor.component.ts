import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { EmissionFactorEstimateAdditionalParameterViewModel } from 'src/app/models/viewModels/climatiq-search-models/estimate/emissionFactorEstimateAdditionalParameterViewModel';
import { EmissionFactorEstimateRequestViewModel } from 'src/app/models/viewModels/climatiq-search-models/estimate/emissionFactorEstimateRequestViewModel';
import { EmissionFactorEstimateUnitValueViewModel } from 'src/app/models/viewModels/climatiq-search-models/estimate/emissionFactorEstimateUnitValueViewModel';
import { EmissionFactorEstimateViewModel } from 'src/app/models/viewModels/climatiq-search-models/estimate/emissionFactorEstimateViewModel';
import { EmissionFactorViewModel } from 'src/app/models/viewModels/climatiq-search-models/emissionFactorViewModel';
import { SearchResponseResultsViewModel } from 'src/app/models/viewModels/climatiq-search-models/search/searchResponseResultsViewModel';
import { Unit } from 'src/app/models/viewModels/unit';
import { UnitType } from 'src/app/models/viewModels/unit-type';
import { ClimatiqRequestService } from 'src/app/services/climatiq-request.service';

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
  public estimate: EmissionFactorEstimateViewModel;

  constructor(private readonly climatiqRequestService: ClimatiqRequestService) {

  }

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

  estimateEmissionFactor() {
    let estimate: EmissionFactorEstimateRequestViewModel = new EmissionFactorEstimateRequestViewModel();
    estimate.emission_factor = this.buildEmissionFactorData();
    estimate.parameters = this.buildParameterData();

    this.climatiqRequestService.getEmissionFactorEstimate(estimate).subscribe((response) => {
      this.estimate = response;
    })

  }

  buildEmissionFactorData(): EmissionFactorViewModel {
    let emissionFactor: EmissionFactorViewModel = new EmissionFactorViewModel();
    emissionFactor.data_version = Constants.CLIMATIQ_DATA_VERSION;
    emissionFactor.activity_id = this.searchResponseResult.activity_id;
    emissionFactor.source = this.searchResponseResult.source;
    emissionFactor.region = this.searchResponseResult.region;
    emissionFactor.year = this.searchResponseResult.year;
    emissionFactor.source_lca_activity = this.searchResponseResult.source_lca_activity;
    return emissionFactor;
  }

  buildParameterData(): { [key: string]: any } {
    let object: { [key: string]: any } = {};

    if (this.additionalParameter !== undefined)
      object[this.additionalParameter.name] = this.additionalParameter.value;

    this.unitValues.forEach(u => {
      object[u.name] = u.selectedUnit;
      object[u.value_parameter_name] = u.inputValue;
    });

    return object;
  }



}
