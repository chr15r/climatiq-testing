import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { AdditionalParameterViewModel } from 'src/app/models/viewModels/climatiq-search-models/estimate/additionalParameterViewModel';
import { EstimateRequestViewModel } from 'src/app/models/viewModels/climatiq-search-models/estimate/estimateRequestViewModel';
import { UnitValueViewModel } from 'src/app/models/viewModels/climatiq-search-models/estimate/unitValueViewModel';
import { EstimateViewModel } from 'src/app/models/viewModels/climatiq-search-models/estimate/estimateViewModel';
import { SelectorViewModel } from 'src/app/models/viewModels/climatiq-search-models/estimate/selectorViewModel';
import { EmissionFactorViewModel } from 'src/app/models/viewModels/climatiq-search-models/search/emissionFactorViewModel';
import { Unit } from 'src/app/models/viewModels/unit';
import { UnitType } from 'src/app/models/viewModels/unit-type';
import { ClimatiqRequestService } from 'src/app/services/climatiq-request.service';

@Component({
  selector: 'app-climatiq-search-response-emission-factor',
  templateUrl: './climatiq-search-response-emission-factor.component.html',
  styleUrls: ['./climatiq-search-response-emission-factor.component.scss']
})
export class ClimatiqSearchResponseEmissionFactorComponent implements OnInit {

  @Input() emissionFactor: EmissionFactorViewModel;
  @Input() unitTypes: UnitType[];

  public availableUnits: Unit[] = [];
  public additionalParameter: AdditionalParameterViewModel;
  public unitValues: UnitValueViewModel[] = [];
  public estimate: EstimateViewModel;
  public loading: boolean = false;

  constructor(private readonly climatiqRequestService: ClimatiqRequestService) {

  }

  ngOnInit(): void {
    this.loadAvailableUnits();
  }

  loadAvailableUnits() {
    let unitType: UnitType = this.unitTypes.find(u => u.unit_type === this.emissionFactor.unit_type)!;
    this.availableUnits = unitType.units;

    if(!!unitType.additional_parameter_name) {
      this.additionalParameter = new AdditionalParameterViewModel(unitType.additional_parameter_name);
    }

    this.availableUnits.forEach(u => {
      this.unitValues.push(new UnitValueViewModel(u.name, u.value_parameter_name, u.values));
    });
  }

  estimateDataValid() {
    return this.unitValuesValid() && (!this.additionalParameter  ||
          (!!this.additionalParameter && !!this.additionalParameter.value));
  }

  unitValuesValid(): boolean {
    let invalidUnits: number = 0;
    this.unitValues.forEach(u => {
      if(!this.unitValueIsValid(u))
        invalidUnits += 1;
    })
    return invalidUnits > 0 ? false : true;
  }

  unitValueIsValid(u: UnitValueViewModel): boolean {
    return u.selectedUnit?.length > 0 && u.inputValue?.toString().length > 0;
  }

  getFormattedString(s: string) {
    return s.replace("_"," ");
  }

  estimateEmissionFactor() {
    this.loading = true;
    let estimate: EstimateRequestViewModel = new EstimateRequestViewModel();
    estimate.emission_factor = this.buildSelectorData();
    estimate.parameters = this.buildParameterData();

    this.climatiqRequestService.getEmissionFactorEstimate<EstimateViewModel>(estimate).subscribe((response) => {
      this.estimate = response;
      this.loading = false;
    })

  }

  buildSelectorData(): SelectorViewModel {
    let selector: SelectorViewModel = new SelectorViewModel();
    selector.data_version = Constants.CLIMATIQ_DATA_VERSION;
    selector.activity_id = this.emissionFactor.activity_id;
    selector.source = this.emissionFactor.source;
    selector.region = this.emissionFactor.region;
    selector.year = this.emissionFactor.year;
    selector.source_lca_activity = this.emissionFactor.source_lca_activity;
    return selector;
  }

  buildParameterData(): { [key: string]: any } {
    let object: { [key: string]: any } = {};

    if (!!this.additionalParameter)
      object[this.additionalParameter.name] = this.additionalParameter.value;

    this.unitValues.forEach(u => {
      object[u.name] = u.selectedUnit;
      object[u.value_parameter_name] = u.inputValue;
    });

    return object;
  }



}
