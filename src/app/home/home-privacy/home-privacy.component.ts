import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TermandconditionService } from 'src/app/service/termandcondition.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home-privacy',
  templateUrl: './home-privacy.component.html',
  styleUrls: ['./home-privacy.component.css']
})
export class HomePrivacyComponent implements OnInit {


  termAndcondition: SafeHtml = '';

  constructor(
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getPrivacyPolicyInfo().subscribe((response: any) => {
      this.termAndcondition = response.privacyInfo;

    });
  }


}
