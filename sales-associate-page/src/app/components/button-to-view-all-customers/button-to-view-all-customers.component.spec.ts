import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonToViewAllCustomersComponent } from './button-to-view-all-customers.component';

describe('ButtonToViewAllCustomersComponent', () => {
  let component: ButtonToViewAllCustomersComponent;
  let fixture: ComponentFixture<ButtonToViewAllCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonToViewAllCustomersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonToViewAllCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
