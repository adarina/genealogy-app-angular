import { TestBed } from '@angular/core/testing';

import { PersonEventsViewService } from './person-events-view.service';

describe('PersonEventsViewService', () => {
  let service: PersonEventsViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonEventsViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
