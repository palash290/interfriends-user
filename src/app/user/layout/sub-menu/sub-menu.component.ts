import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-sub-menu',
    templateUrl: './sub-menu.component.html',
    styleUrls: ['./sub-menu.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SubMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
