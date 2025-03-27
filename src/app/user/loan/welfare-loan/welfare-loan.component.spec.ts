import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelfareLoanComponent } from './welfare-loan.component';

describe('WelfareLoanComponent', () => {
  let component: WelfareLoanComponent;
  let fixture: ComponentFixture<WelfareLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelfareLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelfareLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
