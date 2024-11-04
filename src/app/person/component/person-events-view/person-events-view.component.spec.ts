import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEventsViewComponent } from './person-events-view.component';

describe('PersonEventsViewComponent', () => {
  let component: PersonEventsViewComponent;
  let fixture: ComponentFixture<PersonEventsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonEventsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonEventsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
