import { TestBed } from '@angular/core/testing';

import { NewcartService } from './newcart.service';

describe('NewcartService', () => {
  let service: NewcartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewcartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
