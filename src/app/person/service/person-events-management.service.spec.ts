import { TestBed } from '@angular/core/testing';

import { PersonEventsManagementService } from './person-events-management.service';

describe('PersonEventsManagementService', () => {
  let service: PersonEventsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonEventsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
