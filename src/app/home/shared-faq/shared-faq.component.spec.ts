import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFaqComponent } from './shared-faq.component';

describe('SharedFaqComponent', () => {
  let component: SharedFaqComponent;
  let fixture: ComponentFixture<SharedFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
