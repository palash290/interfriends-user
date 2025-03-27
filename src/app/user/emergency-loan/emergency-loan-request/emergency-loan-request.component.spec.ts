import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyLoanRequestComponent } from './emergency-loan-request.component';

describe('EmergencyLoanRequestComponent', () => {
  let component: EmergencyLoanRequestComponent;
  let fixture: ComponentFixture<EmergencyLoanRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyLoanRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyLoanRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
