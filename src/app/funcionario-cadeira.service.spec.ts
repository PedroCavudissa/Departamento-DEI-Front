import { TestBed } from '@angular/core/testing';

import { FuncionarioCadeiraService } from './services/funcionario-cadeira.service';

describe('FuncionarioCadeiraService', () => {
  let service: FuncionarioCadeiraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionarioCadeiraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
