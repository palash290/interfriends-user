import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutPageComponent } from './payout-page.component';

describe('PayoutPageComponent', () => {
  let component: PayoutPageComponent;
  let fixture: ComponentFixture<PayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
