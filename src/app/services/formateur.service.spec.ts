import { TestBed, inject } from '@angular/core/testing';

import { FormateurService } from './formateur.service';

describe('FormateurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormateurService]
    });
  });

  it('should be created', inject([FormateurService], (service: FormateurService) => {
    expect(service).toBeTruthy();
  }));
});
