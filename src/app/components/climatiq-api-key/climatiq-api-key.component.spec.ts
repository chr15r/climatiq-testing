import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimatiqApiKeyComponent } from './climatiq-api-key.component';

describe('ClimatiqApiKeyComponent', () => {
  let component: ClimatiqApiKeyComponent;
  let fixture: ComponentFixture<ClimatiqApiKeyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClimatiqApiKeyComponent]
    });
    fixture = TestBed.createComponent(ClimatiqApiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
