import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCustomrsComponent } from './all-customrs.component';

describe('AllCustomrsComponent', () => {
  let component: AllCustomrsComponent;
  let fixture: ComponentFixture<AllCustomrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCustomrsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllCustomrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
