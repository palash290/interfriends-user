import { Component, OnInit } from '@angular/core';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@Component({
  selector: 'app-image-magnify-page',
  templateUrl: './image-magnify-page.component.html',
  styleUrls: ['./image-magnify-page.component.css']
})
export class ImageMagnifyPageComponent implements OnInit {
  myThumbnail="https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg";
  myFullresImage="https://wittlock.github.io/ngx-image-zoom/assets/fullres.jpg";

  constructor() { }

  ngOnInit(): void {
  }

}
