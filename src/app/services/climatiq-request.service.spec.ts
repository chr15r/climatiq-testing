import { TestBed } from '@angular/core/testing';

import { ClimatiqRequestService } from './climatiq-request.service';

describe('ClimatiqRequestService', () => {
  let service: ClimatiqRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClimatiqRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
