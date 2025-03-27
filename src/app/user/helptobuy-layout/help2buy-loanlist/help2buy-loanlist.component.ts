import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/app/model/loan.model';
import { AuthService } from 'src/app/service/auth.service';
import { LoanService } from 'src/app/service/loan.service';
import {Location} from '@angular/common';
import { ActivatedRoute, ParamMap} from '@angular/router'

@Component({
  selector: 'app-help2buy-loanlist',
  templateUrl: './help2buy-loanlist.component.html',
  styleUrls: ['./help2buy-loanlist.component.css']
})
export class Help2buyLoanlistComponent implements OnInit {

  isLoading = true;
  loanType : string;
  userId: string;
  groupId: string;
  avgAmount: string;
  avgComplete: string;
  status = '1';
  laonPending: Loan[] = [];
  laonComplete: Loan[] = [];
  laonActive: Loan[] = [];

  constructor(
    public loanService: LoanService,
    public authService: AuthService,
    private _location: Location,

    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.get('loanType')) {
        this.loanType =  paramMap.get('loanType');
      } else {
        this.loanType = '2'
      }
      console.log('Inside Help2Buy Loanlist Component');
      this.groupId = this.authService.getgroupId();
      this.userId = this.authService.getUserId();
    });

    this.loanService.loanList(this.userId, this.groupId, this.status, this.loanType).subscribe((response: any) => {
        this.laonPending = response.laonPending;
        this.laonComplete = response.laonComplete;
        this.laonActive = response.laonActive;
        this.isLoading = false;
        this.avgAmount = response.avgAmount;
        this.avgComplete = response.avgComplete;
    });
  }


  onSetStatus(status: string) {
    this.status = status;
  }


  onAddHistory(status: string, index: number, id: string) {
    this.loanService.loanPaymentList(this.userId, this.groupId, id).subscribe((response: any) => {
      if(status === '1') {
        if(this.laonActive[index]['payment_list'].length <= 0 && this.laonActive[index]['payment_list_status'] == true) {
          this.laonActive[index]['payment_list'] = response.paymentList;
          this.laonActive[index]['payment_list_status'] = false;
        }
      }

      if(status === '2') {
        if(this.laonComplete[index]['payment_list'].length <= 0 && this.laonComplete[index]['payment_list_status'] == true) {
          this.laonComplete[index]['payment_list'] = response.paymentList;
          this.laonComplete[index]['payment_list_status'] = false;
        }
      }
    });

  }


  backClicked() {
    this._location.back();
  }
}
