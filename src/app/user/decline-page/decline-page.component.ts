import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-decline-page',
    templateUrl: './decline-page.component.html',
    styleUrls: ['./decline-page.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DeclinePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
