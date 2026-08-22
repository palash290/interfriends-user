import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-image-magnify-page',
    templateUrl: './image-magnify-page.component.html',
    styleUrls: ['./image-magnify-page.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ImageMagnifyPageComponent implements OnInit {
  myThumbnail="https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg";
  myFullresImage="https://wittlock.github.io/ngx-image-zoom/assets/fullres.jpg";

  constructor() { }

  ngOnInit(): void {
  }

}
