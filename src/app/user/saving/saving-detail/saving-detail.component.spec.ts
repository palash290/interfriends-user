import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingDetailComponent } from './saving-detail.component';

describe('SavingDetailComponent', () => {
  let component: SavingDetailComponent;
  let fixture: ComponentFixture<SavingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
