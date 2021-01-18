/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleVerificationService } from './vehicle-verification.service';

describe('Service: VehicleVerification', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleVerificationService]
    });
  });

  it('should ...', inject([VehicleVerificationService], (service: VehicleVerificationService) => {
    expect(service).toBeTruthy();
  }));
});
