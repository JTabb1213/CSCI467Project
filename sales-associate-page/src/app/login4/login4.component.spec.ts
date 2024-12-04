import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login4Component } from './login4.component';

describe('Login4Component', () => {
  let component: Login4Component;
  let fixture: ComponentFixture<Login4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Login4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
