import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCustomersLayoutComponent } from './all-customers-layout.component';

describe('AllCustomersLayoutComponent', () => {
  let component: AllCustomersLayoutComponent;
  let fixture: ComponentFixture<AllCustomersLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCustomersLayoutComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AllCustomersLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
