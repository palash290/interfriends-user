import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-shared-faq',
    templateUrl: './shared-faq.component.html',
    styleUrls: ['./shared-faq.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SharedFaqComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
