import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TermandconditionService } from 'src/app/service/termandcondition.service';

@Component({
  selector: 'app-termandcondition',
  templateUrl: './termandcondition.component.html',
  styleUrls: ['./termandcondition.component.css']
})
export class TermandconditionComponent implements OnInit {

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
