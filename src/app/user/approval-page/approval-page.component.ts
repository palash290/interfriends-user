import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-approval-page',
  templateUrl: './approval-page.component.html',
  styleUrls: ['./approval-page.component.css']
})
export class ApprovalPageComponent implements OnInit {

  token: string = '';
  id: string = '';
  message: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
      this.id = params['id'];

      // Set message based on token
      switch (this.token) {
        case 'second_recommender':
          this.message = 'You have approved. Awaiting circle lead or deputy circle lead approval.';
          break;
        case 'circle_lead':
          this.message = 'Circle Lead/ Deputy Circle Lead approval complete. Awaiting admin approval.';
          break;
        case 'admin':
          this.message = 'Final approval completed. Email sent to user.';
          break;
        default:
          this.message = 'Invalid approval stage.';
      }
    });
  }


}
