import { TestBed } from '@angular/core/testing';

import { ConfirmnService } from './confirmn.service';

describe('ConfirmnService', () => {
  let service: ConfirmnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
