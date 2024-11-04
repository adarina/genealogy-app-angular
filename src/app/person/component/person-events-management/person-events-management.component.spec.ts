import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEventsManagementComponent } from './person-events-management.component';

describe('PersonEventsManagementComponent', () => {
  let component: PersonEventsManagementComponent;
  let fixture: ComponentFixture<PersonEventsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonEventsManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonEventsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
