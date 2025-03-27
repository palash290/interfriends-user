import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInvestmentComponent } from './contact-investment.component';

describe('ContactInvestmentComponent', () => {
  let component: ContactInvestmentComponent;
  let fixture: ComponentFixture<ContactInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactInvestmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
