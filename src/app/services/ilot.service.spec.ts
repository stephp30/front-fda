import { TestBed, inject } from '@angular/core/testing';

import { IlotService } from './ilot.service';

describe('IlotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IlotService]
    });
  });

  it('should be created', inject([IlotService], (service: IlotService) => {
    expect(service).toBeTruthy();
  }));
});
