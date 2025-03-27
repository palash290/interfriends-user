import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMagnifyPageComponent } from './image-magnify-page.component';

describe('ImageMagnifyPageComponent', () => {
  let component: ImageMagnifyPageComponent;
  let fixture: ComponentFixture<ImageMagnifyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageMagnifyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageMagnifyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
