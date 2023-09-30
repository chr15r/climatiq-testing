import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimatiqEstimateComponent } from './climatiq-estimate.component';

describe('ClimatiqEstimateComponent', () => {
  let component: ClimatiqEstimateComponent;
  let fixture: ComponentFixture<ClimatiqEstimateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClimatiqEstimateComponent]
    });
    fixture = TestBed.createComponent(ClimatiqEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
