import { TestBed } from '@angular/core/testing';

import { FamilyViewService } from './family-view.service';

describe('FamilyViewService', () => {
  let service: FamilyViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
