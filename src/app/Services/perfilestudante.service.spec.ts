import { TestBed } from '@angular/core/testing';

import { PerfilestudanteService } from './Services/perfilestudante.service';

describe('PerfilestudanteService', () => {
  let service: PerfilestudanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilestudanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
