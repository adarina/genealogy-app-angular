import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFamiliesViewComponent } from './person-families-view.component';

describe('PersonFamiliesViewComponent', () => {
  let component: PersonFamiliesViewComponent;
  let fixture: ComponentFixture<PersonFamiliesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonFamiliesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonFamiliesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
