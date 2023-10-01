import { Component, Input, OnInit } from '@angular/core';
import { SearchResponseResultsViewModel } from 'src/app/models/viewModels/climatiq-search-models/search/searchResponseResultsViewModel';
import { UnitType } from 'src/app/models/viewModels/unit-type';

@Component({
  selector: 'app-climatiq-search-response-emission-factor',
  templateUrl: './climatiq-search-response-emission-factor.component.html',
  styleUrls: ['./climatiq-search-response-emission-factor.component.scss']
})
export class ClimatiqSearchResponseEmissionFactorComponent implements OnInit {

  @Input() searchResponseResult: SearchResponseResultsViewModel;
  @Input() unitTypes: UnitType[];


  public availableUnits: any[] = [];

  ngOnInit(): void {
    this.loadAvailableUnits();
  }


  loadAvailableUnits() {
    let unitType: UnitType = this.unitTypes.find(u => u.unit_type === this.searchResponseResult.unit_type)!;

    if (unitType) {
      this.availableUnits = unitType.units;
    }

  }



}
