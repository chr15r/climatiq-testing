import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { SearchRequestViewModel } from 'src/app/models/viewModels/climatiq-search-models/searchRequestViewModel';
import { Category } from 'src/app/models/viewModels/category';
import { Region } from 'src/app/models/viewModels/region';
import { Sector } from 'src/app/models/viewModels/sector';
import * as regionData from '../../models/json-data/regions.json';
import * as sectorData from '../../models/json-data/sectors.json';
import * as categoryData from '../../models/json-data/categories.json';
import { ClimatiqRequestService } from 'src/app/services/climatiq-request.service';
import { SearchResponseResultsViewModel } from 'src/app/models/viewModels/climatiq-search-models/searchResponseResultsViewModel';
import { SearchResponseViewModel } from 'src/app/models/viewModels/climatiq-search-models/searchResponseViewModel';

@Component({
  selector: 'app-climatiq-estimate',
  templateUrl: './climatiq-estimate.component.html',
  styleUrls: ['./climatiq-estimate.component.scss']
})
export class ClimatiqEstimateComponent implements OnInit  {

  title = 'climatiq';

  @ViewChild('categoryDropdown') categoryDropdown:NgSelectComponent;

  public searchRequestViewModel: SearchRequestViewModel = new SearchRequestViewModel();
  public searchResponseViewModel: SearchResponseViewModel = new SearchResponseViewModel();
  public regionDropdownData: Region[] = [];
  public sectorDropdownData: Sector[] = [];
  public categoryDropdownData: Category[] = [];
  public yearsDropdownData: string[] = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];

  public basicInfoForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly climatiqRequestService: ClimatiqRequestService) { }

  ngOnInit(): void {
    this.loadDropdownData();
    this.basicInfoForm = this.fb.group({});
    this.changeDetector.detectChanges();

  }

  basicFormValid(): boolean {
    return this.searchRequestViewModel?.region.length > 0
    && this.searchRequestViewModel?.year.length > 0
    && this.searchRequestViewModel?.sector.length > 0
    && this.searchRequestViewModel?.category.length > 0;
  }


  /**
   * Loading form dropdown data
   */
  loadDropdownData() {

    this.loadRegionDropdown();
    this.loadSectorDropdown();
    this.loadCategoryDropdown();
  }


  loadRegionDropdown() {
    this.regionDropdownData = [];
    const regionDataString: string = JSON.stringify(regionData);
    const regionDropdownData = JSON.parse(regionDataString) as Region[];
    Array.from(regionDropdownData).forEach(element => {
      let region: Region = new Region(element.name, element.code);
      this.regionDropdownData.push(region);
    });
    this.regionDropdownData = this.regionDropdownData.sort((a, b) => a.name.localeCompare(b.name));
  }

  loadSectorDropdown() {
    this.sectorDropdownData = [];
    const sectorDataString: string = JSON.stringify(sectorData);
    const sectorDropdownData = JSON.parse(sectorDataString) as string[];
    Array.from(sectorDropdownData).forEach(element => {
      let sector: Sector = new Sector(element);
      this.sectorDropdownData.push(sector);
    });
    this.sectorDropdownData = this.sectorDropdownData.sort((a, b) => a.name.localeCompare(b.name));
  }

  loadCategoryDropdown() {
    this.categoryDropdownData = [];
    const categoryDataString: string = JSON.stringify(categoryData);
    const categoryDropdownData = JSON.parse(categoryDataString) as Category[];
    Array.from(categoryDropdownData).forEach(element => {
      let category: Category = new Category(element.name, element.sector);
      this.categoryDropdownData.push(category);
    });

    this.categoryDropdownData = this.categoryDropdownData.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Form dropdown events
   */

  onYearChange(year: string) {
    this.searchRequestViewModel.year = year;
  }

  onRegionChange(region: Region) {
    this.searchRequestViewModel.region = region.code;
  }

  onSectorClear() {
    this.clearCategoryDropdown();
  }

  onSectorChange(sector: Sector) {
    this.searchRequestViewModel.sector = sector.name;
    // Reset category and load categories within chosen sector
    this.clearCategoryDropdown();
    this.searchRequestViewModel.category = '';
    this.categoryDropdownData = this.categoryDropdownData.filter(category => category.sector === sector.name);
  }

  clearCategoryDropdown() {
    this.loadCategoryDropdown();
    this.categoryDropdown.handleClearClick();
  }

  onCategoryChange(category: Category) {
    if(category)
      this.searchRequestViewModel.category = category.name;
  }


  onSubmit() {
    this.climatiqRequestService.searchAvailableEmissionFactors(this.searchRequestViewModel).subscribe((response: SearchResponseViewModel) => {
      this.searchResponseViewModel = response;
    });
  }

}
