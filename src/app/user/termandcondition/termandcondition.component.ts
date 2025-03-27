import { Component, OnInit } from '@angular/core';
import { TermandconditionService } from 'src/app/service/termandcondition.service';

@Component({
  selector: 'app-termandcondition',
  templateUrl: './termandcondition.component.html',
  styleUrls: ['./termandcondition.component.css']
})
export class TermandconditionComponent implements OnInit {
termAndcondition : any;
  constructor(private termAndconditonService : TermandconditionService) { }

  ngOnInit(): void {

    this.termAndconditonService.getTermAndcondition().subscribe((response : any)=>{
      if(response.success == 1){
        this.termAndcondition = response.termsInfo;
      }else{

      }
    })
  }

}
