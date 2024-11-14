import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllQuotesButtonComponent } from './view-all-quotes-button.component';

describe('ViewAllQuotesButtonComponent', () => {
  let component: ViewAllQuotesButtonComponent;
  let fixture: ComponentFixture<ViewAllQuotesButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllQuotesButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAllQuotesButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
