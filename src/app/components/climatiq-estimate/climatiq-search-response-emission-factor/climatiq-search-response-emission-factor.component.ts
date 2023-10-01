import { Component, Input } from '@angular/core';
import { SearchResponseResultsViewModel } from 'src/app/models/viewModels/climatiq-search-models/search/searchResponseResultsViewModel';
import { UnitType } from 'src/app/models/viewModels/unit-type';

@Component({
  selector: 'app-climatiq-search-response-emission-factor',
  templateUrl: './climatiq-search-response-emission-factor.component.html',
  styleUrls: ['./climatiq-search-response-emission-factor.component.scss']
})
export class ClimatiqSearchResponseEmissionFactorComponent {
  @Input() searchResponseResult: SearchResponseResultsViewModel;
  @Input() unitTypes: UnitType[];

  /**
   *
   * Emission Factor estimate methods
   *
   */

  getEmissionFactorEstimate(searchResponse: SearchResponseResultsViewModel) {

    let unitType: UnitType = this.unitTypes.find(u => u.unit_type === searchResponse.unit_type[0].unit_type)!;

  }

}
