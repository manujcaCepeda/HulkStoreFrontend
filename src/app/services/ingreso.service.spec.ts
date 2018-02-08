import { TestBed, inject } from '@angular/core/testing';

import { IngresoService } from './ingreso.service';

describe('IngresoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngresoService]
    });
  });

  it('should be created', inject([IngresoService], (service: IngresoService) => {
    expect(service).toBeTruthy();
  }));
});
