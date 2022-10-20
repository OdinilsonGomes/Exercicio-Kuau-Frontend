import { TestBed } from '@angular/core/testing';

import { AutotizadoGuard } from './autotizado.guard';

describe('AutotizadoGuard', () => {
  let guard: AutotizadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutotizadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
