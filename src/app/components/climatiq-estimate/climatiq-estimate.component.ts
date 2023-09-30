import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { BasicInfoViewModel } from 'src/app/models/viewModels/basicInfoViewModel';
import { Category } from 'src/app/models/viewModels/category';
import { Region } from 'src/app/models/viewModels/region';
import { Sector } from 'src/app/models/viewModels/sector';
import * as regionData from '../../models/json-data/regions.json';
import * as sectorData from '../../models/json-data/sectors.json';
import * as categoryData from '../../models/json-data/categories.json';

@Component({
  selector: 'app-climatiq-estimate',
  templateUrl: './climatiq-estimate.component.html',
  styleUrls: ['./climatiq-estimate.component.scss']
})
export class ClimatiqEstimateComponent implements OnInit  {

  title = 'climatiq';

  @ViewChild('categoryDropdown') categoryDropdown:NgSelectComponent;

  public basicInfoViewModel: BasicInfoViewModel = new BasicInfoViewModel();
  public regionDropdownData: Region[] = [];
  public sectorDropdownData: Sector[] = [];
  public categoryDropdownData: Category[] = [];
  public yearsDropdownData: string[] = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];

  public basicInfoForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private readonly changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadDropdownData();
    this.basicInfoForm = this.fb.group({});
    this.changeDetector.detectChanges();

  }


  onSubmit() {
    console.log(this.basicInfoViewModel);
  }

  basicFormValid(): boolean {
    return this.basicInfoViewModel?.region.length > 0
    && this.basicInfoViewModel?.year.length > 0
    && this.basicInfoViewModel?.sector.length > 0
    && this.basicInfoViewModel?.category.length > 0;
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
    this.basicInfoViewModel.year = year;
  }

  onRegionChange(region: Region) {
    this.basicInfoViewModel.region = region.code;
  }

  onSectorChange(sector: Sector) {
    this.basicInfoViewModel.sector = sector.name;

    // Reset category and load categories within chosen sector
    this.basicInfoViewModel.category = '';

    this.loadCategoryDropdown();
    this.categoryDropdownData = this.categoryDropdownData.filter(category => category.sector === sector.name);

    this.categoryDropdown.handleClearClick();

  }

  onCategoryChange(category: Category) {
    this.basicInfoViewModel.category = category.name;
  }

}
