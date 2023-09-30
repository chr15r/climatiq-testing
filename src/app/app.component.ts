import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as regionData from './models/json-data/regions.json';
import * as sectorData from './models/json-data/sectors.json';
import * as categoryData from './models/json-data/categories.json';
import {  UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Region } from './models/viewModels/region';
import { BasicInfoViewModel } from './models/viewModels/basicInfoViewModel';
import { Sector } from './models/viewModels/sector';
import { Category } from './models/viewModels/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'climatiq';
  public basicInfoViewModel: BasicInfoViewModel = new BasicInfoViewModel();

  public regionDropdownData: Region[] = [];
  public sectorDropdownData: Sector[] = [];
  public categoryDropdownData: Category[] = [];

  public basicInfoForm: UntypedFormGroup;
  public yearsDropdownData: string[] = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];

  constructor(private fb: UntypedFormBuilder, private readonly changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadDropdownData();
    this.basicInfoForm = this.fb.group({});
    this.changeDetector.detectChanges();

  }

  loadDropdownData() {
    const regionDataString: string = JSON.stringify(regionData);
    const regionDropdownData = JSON.parse(regionDataString) as Region[];
    Array.from(regionDropdownData).forEach(element => {
      let region: Region = new Region(element.name, element.code);
      this.regionDropdownData.push(region);
    });

    const sectorDataString: string = JSON.stringify(sectorData);
    const sectorDropdownData = JSON.parse(sectorDataString) as string[];
    Array.from(sectorDropdownData).forEach(element => {
      let sector: Sector = new Sector(element);
      this.sectorDropdownData.push(sector);
    });

    const categoryDataString: string = JSON.stringify(categoryData);
    const categoryDropdownData = JSON.parse(categoryDataString) as Category[];
    Array.from(categoryDropdownData).forEach(element => {
      let category: Category = new Category(element.name, element.sector);
      this.categoryDropdownData.push(category);
    });

    this.categoryDropdownData = this.categoryDropdownData.sort((a, b) => a.name.localeCompare(b.name));
    this.regionDropdownData = this.regionDropdownData.sort((a, b) => a.name.localeCompare(b.name));
    this.sectorDropdownData = this.sectorDropdownData.sort((a, b) => a.name.localeCompare(b.name));

  }

  onSubmit() {
    console.log(this.basicInfoViewModel);
  }

  basicFormValid(): boolean {
    return this.basicInfoViewModel?.region.length > 0 && this.basicInfoViewModel?.year.length > 0;
  }

  onYearChange(year: string) {
    this.basicInfoViewModel.year = year;
  }

  onRegionChange(region: Region) {
    this.basicInfoViewModel.region = region.code;
  }

  onSectorChange(sector: Sector) {
    this.basicInfoViewModel.sector = sector.name;
  }

  onCategoryChange(category: Category) {
    this.basicInfoViewModel.category = category.name;
  }

}
