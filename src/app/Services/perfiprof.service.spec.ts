import { TestBed } from '@angular/core/testing';

import { PerfiprofService } from './perfiprof.service';

describe('PerfiprofService', () => {
  let service: PerfiprofService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfiprofService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
