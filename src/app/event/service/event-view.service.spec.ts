import { TestBed } from '@angular/core/testing';

import { EventViewService } from './event-view.service';

describe('EventViewService', () => {
  let service: EventViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
