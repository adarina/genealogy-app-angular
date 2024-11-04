import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyDetailsViewComponent } from './family-details-view.component';

describe('FamilyDetailsViewComponent', () => {
  let component: FamilyDetailsViewComponent;
  let fixture: ComponentFixture<FamilyDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyDetailsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
