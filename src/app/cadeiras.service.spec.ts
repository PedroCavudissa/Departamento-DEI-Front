import { TestBed } from '@angular/core/testing';

import { CadeirasService } from './services/cadeiras.service';

describe('CadeirasService', () => {
  let service: CadeirasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadeirasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
