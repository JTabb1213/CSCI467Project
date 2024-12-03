import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizedQuotesComponent } from './finalized-quotes.component';

describe('FinalizedQuotesComponent', () => {
  let component: FinalizedQuotesComponent;
  let fixture: ComponentFixture<FinalizedQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizedQuotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalizedQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
