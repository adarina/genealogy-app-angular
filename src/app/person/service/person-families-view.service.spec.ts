import { TestBed } from '@angular/core/testing';

import { PersonFamiliesViewService } from './person-families-view.service';

describe('PersonFamiliesViewService', () => {
  let service: PersonFamiliesViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonFamiliesViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
