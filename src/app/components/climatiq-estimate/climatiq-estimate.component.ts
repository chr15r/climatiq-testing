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
import { SearchResponseViewModel } from 'src/app/models/viewModels/climatiq-search-models/searchResponseViewModel';

@Component({
  selector: 'app-climatiq-estimate',
  templateUrl: './climatiq-estimate.component.html',
  styleUrls: ['./climatiq-estimate.component.scss']
})
export class ClimatiqEstimateComponent implements OnInit  {

  title = 'climatiq';

  @ViewChild('categoryDropdown') categoryDropdown:NgSelectComponent;
  @ViewChild('regionDropdown') regionDropdown:NgSelectComponent;
  @ViewChild('yearDropDown') yearDropDown:NgSelectComponent;
  @ViewChild('sectorDropdown') sectorDropdown:NgSelectComponent;

  public searchResponseViewModel: SearchResponseViewModel = new SearchResponseViewModel();
  public savedSearches: SearchRequestViewModel[] = [];
  public searchError: string = ''
  public regionDropdownData: Region[] = [];
  public sectorDropdownData: Sector[] = [];

  public categoryDropdownData: Category[] = [];
  public yearsDropdownData: string[] = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];

  public selectedRegion: Region;
  public selectedSector: Sector;
  public selectedCategory: Category;
  public selectedYear: string;

  constructor(private fb: UntypedFormBuilder,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly climatiqRequestService: ClimatiqRequestService) { }

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
   * Load existing search reequests
   */

  loadSavedSearches() {
    let savedSearchRequests: SearchRequestViewModel[] = JSON.parse(localStorage.getItem('savedSearches')!);
    this.savedSearches = savedSearchRequests;
  }

  deleteSavedSearch(search: SearchRequestViewModel) {
    let savedSearchRequests: SearchRequestViewModel[] = JSON.parse(localStorage.getItem('savedSearches')!);
    let requestToDelete = savedSearchRequests.find(s => s.id === search.id);
    if (requestToDelete){
      savedSearchRequests.splice(savedSearchRequests.indexOf(requestToDelete), 1);
      localStorage.setItem('savedSearches', JSON.stringify(savedSearchRequests));
      this.loadSavedSearches();
    }
  }

  loadSavedSearch(search: SearchRequestViewModel) {
    this.selectedCategory = this.categoryDropdownData.find(category => category.name === search.category)!;
    this.selectedRegion = this.regionDropdownData.find(region => region.code === search.region)!;
    this.selectedSector = this.sectorDropdownData.find(sector => sector.name === search.sector)!;
    this.selectedYear = search.year;
    this.onSubmit();
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
    this.categoryDropdownData = this.categoryDropdownData.filter(category => category.sector === sector.name);
  }

  clearCategoryDropdown() {
    this.loadCategoryDropdown();
    this.categoryDropdown.handleClearClick();
  }

  /**
   *
   * Form submission & validation
   */

  searchRequestValid(): boolean {
    return this.selectedCategory?.name.length > 0 && this.selectedRegion?.name.length > 0 && this.selectedSector?.name.length > 0 && this.selectedYear.length > 0 ? true : false;
  }

  onClear() {
    this.loadForm();
  }

  onSubmit() {
    this.searchError = '';
    let searchRequestViewModel = new SearchRequestViewModel(this.selectedRegion.code, this.selectedYear, this.selectedSector.name, this.selectedCategory.name);
    this.climatiqRequestService.searchAvailableEmissionFactors(searchRequestViewModel).subscribe((response: SearchResponseViewModel) => {
      this.searchResponseViewModel = response;
      this.loadSavedSearches();
    }), (error: any) => {
      this.searchError = error;
    };
  }

}
