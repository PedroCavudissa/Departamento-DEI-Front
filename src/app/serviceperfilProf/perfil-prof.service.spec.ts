import { TestBed } from '@angular/core/testing';

import { PerfilProfService } from './perfil-prof.service';

describe('PerfilProfService', () => {
  let service: PerfilProfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilProfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
