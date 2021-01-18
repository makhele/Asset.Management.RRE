/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AssetRegisterService } from './asset-register.service';

describe('Service: AssetRegister', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetRegisterService]
    });
  });

  it('should ...', inject([AssetRegisterService], (service: AssetRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
