import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunQuotesComponent } from './run-quotes.component';

describe('RunQuotesComponent', () => {
  let component: RunQuotesComponent;
  let fixture: ComponentFixture<RunQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunQuotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RunQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
