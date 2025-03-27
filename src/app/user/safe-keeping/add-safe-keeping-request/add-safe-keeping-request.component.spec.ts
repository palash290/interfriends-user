import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSafeKeepingRequestComponent } from './add-safe-keeping-request.component';

describe('AddSafeKeepingRequestComponent', () => {
  let component: AddSafeKeepingRequestComponent;
  let fixture: ComponentFixture<AddSafeKeepingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSafeKeepingRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSafeKeepingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
