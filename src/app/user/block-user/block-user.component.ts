import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-block-user',
    templateUrl: './block-user.component.html',
    styleUrls: ['./block-user.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class BlockUserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
