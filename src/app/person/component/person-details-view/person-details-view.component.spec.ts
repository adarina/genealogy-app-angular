import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailsViewComponent } from './person-details-view.component';

describe('PersonDetailsViewComponent', () => {
  let component: PersonDetailsViewComponent;
  let fixture: ComponentFixture<PersonDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonDetailsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
