import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TermandconditionService } from 'src/app/service/termandcondition.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home-terms',
  templateUrl: './home-terms.component.html',
  styleUrls: ['./home-terms.component.css']
})
export class HomeTermsComponent implements OnInit {

  termAndcondition: SafeHtml = '';

  constructor(
    private termAndconditonService: TermandconditionService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.termAndconditonService.getTermAndcondition().subscribe((response: any) => {
      if (response.success == 1) {
        this.termAndcondition = this.sanitizer.bypassSecurityTrustHtml(response.termsInfo);
      }
    });
  }
  

}
