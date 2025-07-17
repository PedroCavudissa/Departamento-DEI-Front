import { TestBed } from '@angular/core/testing';

import { VerPautaSecretariaService } from './services/ver-pauta-secretaria.service';

describe('VerPautaSecretariaService', () => {
  let service: VerPautaSecretariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerPautaSecretariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
