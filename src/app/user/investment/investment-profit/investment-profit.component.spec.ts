import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentProfitComponent } from './investment-profit.component';

describe('InvestmentProfitComponent', () => {
  let component: InvestmentProfitComponent;
  let fixture: ComponentFixture<InvestmentProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentProfitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
