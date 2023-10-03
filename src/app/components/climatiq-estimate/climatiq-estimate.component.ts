import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { SearchRequestViewModel } from 'src/app/models/viewModels/climatiq-search-models/search/searchRequestViewModel';
import { Category } from 'src/app/models/viewModels/category';
import { Region } from 'src/app/models/viewModels/region';
import { Sector } from 'src/app/models/viewModels/sector';
import * as regionData from '../../models/json-data/regions.json';
import * as sectorData from '../../models/json-data/sectors.json';
import * as categoryData from '../../models/json-data/categories.json';
import * as unitTypeData from '../../models/json-data/unit-types.json';
import { ClimatiqRequestService } from 'src/app/services/climatiq-request.service';
import { SearchResponseViewModel } from 'src/app/models/viewModels/climatiq-search-models/search/searchResponseViewModel';
import { UnitType } from 'src/app/models/viewModels/unit-type';
import { ErrorViewModel } from 'src/app/models/viewModels/climatiq-search-models/errorViewModel';

@Component({
  selector: 'app-climatiq-estimate',
  templateUrl: './climatiq-estimate.component.html',
  styleUrls: ['./climatiq-estimate.component.scss'],
})
export class ClimatiqEstimateComponent implements OnInit {
  title = 'climatiq';

  @ViewChild('categoryDropdown') categoryDropdown: NgSelectComponent;
  @ViewChild('regionDropdown') regionDropdown: NgSelectComponent;
  @ViewChild('yearDropDown') yearDropDown: NgSelectComponent;
  @ViewChild('sectorDropdown') sectorDropdown: NgSelectComponent;

  public searchResponseViewModel: SearchResponseViewModel = new SearchResponseViewModel();
  public error: ErrorViewModel;
  public savedSearches: SearchRequestViewModel[] = [];
  public regionDropdownData: Region[] = [];
  public sectorDropdownData: Sector[] = [];

  public categoryDropdownData: Category[] = [];
  public yearsDropdownData: string[] = [
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
  ];

  public selectedRegion: Region;
  public selectedSector: Sector;
  public selectedCategory: Category;
  public selectedYear: string;

  public unitTypes: UnitType[] = [];
  public isLoadedFromSavedSearch: boolean = false;
  public showSaveSearchButton: boolean = false;
  public loading: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly climatiqRequestService: ClimatiqRequestService
  ) {}

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.selectedRegion = new Region('', '');
    this.selectedSector = new Sector('');
    this.selectedCategory = new Category('', '');
    this.selectedYear = '';
    this.searchResponseViewModel = new SearchResponseViewModel();
    this.loadSavedSearches();
    this.loadDropdownData();
    this.loadUnitTypes();
    this.changeDetector.detectChanges();
  }

  /**
   * Loading form dropdown data
   */
  loadDropdownData() {
    this.loadRegionDropdown();
    this.loadSectorDropdown();
    this.loadCategoryDropdown();
  }

  loadUnitTypes() {
    this.unitTypes = [];
    const unitTypeDataString: string = JSON.stringify(unitTypeData);
    const unitTypeDropdownData = JSON.parse(unitTypeDataString) as UnitType[];
    Array.from(unitTypeDropdownData).forEach((element) => {
      let unitType: UnitType = new UnitType(
        element.unit_type,
        element.additional_parameter_name,
        element.units
      );
      this.unitTypes.push(unitType);
    });
  }

  loadRegionDropdown() {
    this.regionDropdownData = [];
    const regionDataString: string = JSON.stringify(regionData);
    const regionDropdownData = JSON.parse(regionDataString) as Region[];
    Array.from(regionDropdownData).forEach((element) => {
      let region: Region = new Region(element.name, element.code);
      this.regionDropdownData.push(region);
    });
    this.regionDropdownData = this.regionDropdownData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  loadSectorDropdown() {
    this.sectorDropdownData = [];
    const sectorDataString: string = JSON.stringify(sectorData);
    const sectorDropdownData = JSON.parse(sectorDataString) as string[];
    Array.from(sectorDropdownData).forEach((element) => {
      let sector: Sector = new Sector(element);
      this.sectorDropdownData.push(sector);
    });
    this.sectorDropdownData = this.sectorDropdownData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  loadCategoryDropdown() {
    this.categoryDropdownData = [];
    const categoryDataString: string = JSON.stringify(categoryData);
    const categoryDropdownData = JSON.parse(categoryDataString) as Category[];
    Array.from(categoryDropdownData).forEach((element) => {
      let category: Category = new Category(element.name, element.sector);
      this.categoryDropdownData.push(category);
    });

    this.categoryDropdownData = this.categoryDropdownData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  /**
   * Load existing search reequests
   */

  loadSavedSearches() {
    let savedSearchRequests: SearchRequestViewModel[] = JSON.parse(
      localStorage.getItem('savedSearches')!
    );
    this.savedSearches = savedSearchRequests;
  }

  deleteSavedSearch(search: SearchRequestViewModel) {
    let savedSearchRequests: SearchRequestViewModel[] = JSON.parse(
      localStorage.getItem('savedSearches')!
    );
    let requestToDelete = savedSearchRequests.find((s) => s.id === search.id);
    if (requestToDelete) {
      savedSearchRequests.splice(
        savedSearchRequests.indexOf(requestToDelete),
        1
      );
      localStorage.setItem(
        'savedSearches',
        JSON.stringify(savedSearchRequests)
      );
      this.loadSavedSearches();
    }
  }

  populateSavedSearch(search: SearchRequestViewModel) {
    this.clearCategoryDropdown();
    this.selectedCategory = this.categoryDropdownData.find(
      (category) => category.name === search.category
    )!;
    this.selectedRegion = this.regionDropdownData.find(
      (region) => region.code === search.region
    )!;
    this.selectedSector = this.sectorDropdownData.find(
      (sector) => sector.name === search.sector
    )!;
    this.selectedYear = search.year;
    this.onSubmit(false);
  }

  /**
   * Form dropdown events
   */

  onSectorClear() {
    this.clearCategoryDropdown();
  }

  onSectorChange(sector: Sector) {
    // Reset category and load categories within chosen sector
    this.clearCategoryDropdown();
    this.categoryDropdownData = this.categoryDropdownData.filter(
      (category) => category.sector === sector.name
    );
  }

  clearCategoryDropdown() {
    this.loadCategoryDropdown();
    this.categoryDropdown.handleClearClick();
  }

  /**
   *
   * Search Form submission & validation
   */

  searchRequestValid(): boolean {
    return this.selectedCategory?.name.length > 0 &&
      this.selectedRegion?.name.length > 0 &&
      this.selectedSector?.name.length > 0 &&
      this.selectedYear.length > 0
      ? true
      : false;
  }

  onClear() {
    this.loadForm();
  }

  onSaveSearch() {
    let searchRequestViewModel = this.getCurrentSearchRequest();
    this.climatiqRequestService.saveSearchToCache(searchRequestViewModel);
    this.loadSavedSearches();
    this.showSaveSearchButton = false;
  }

  onSubmit(showSaveSearchButton: boolean = true) {
    this.loading = true;
    let searchRequestViewModel = this.getCurrentSearchRequest();
    this.climatiqRequestService
      .searchAvailableEmissionFactors(searchRequestViewModel)
      .subscribe(response => {
        if(response.error !== undefined) {
          this.error = response;
        }
        else {
          this.searchResponseViewModel = response;
        }
        this.showSaveSearchButton = showSaveSearchButton;
        this.loading = false;
      });
  }

  getCurrentSearchRequest() {
    return new SearchRequestViewModel(
      this.selectedRegion.code,
      this.selectedYear,
      this.selectedSector.name,
      this.selectedCategory.name
    );
  }
}
