import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimatiqSearchResponseEmissionFactorComponent } from './climatiq-search-response-emission-factor.component';

describe('ClimatiqSearchResponseEmissionFactorComponent', () => {
  let component: ClimatiqSearchResponseEmissionFactorComponent;
  let fixture: ComponentFixture<ClimatiqSearchResponseEmissionFactorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClimatiqSearchResponseEmissionFactorComponent]
    });
    fixture = TestBed.createComponent(ClimatiqSearchResponseEmissionFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
