import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/app/model/loan.model';
import { AuthService } from 'src/app/service/auth.service';
import { LoanService } from 'src/app/service/loan.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-my-loans',
  templateUrl: './my-loans.component.html',
  styleUrls: ['./my-loans.component.css']
})
export class MyLoansComponent implements OnInit {
  isLoading = true;
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
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.groupId = this.authService.getgroupId();
    this.loanService.loanList(this.userId, this.groupId, this.status, '1').subscribe((response: any) => {
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
