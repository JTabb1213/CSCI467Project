import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotesComponent } from './sales-quotes.component';

describe('SalesQuotesComponent', () => {
  let component: SalesQuotesComponent;
  let fixture: ComponentFixture<SalesQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesQuotesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SalesQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
