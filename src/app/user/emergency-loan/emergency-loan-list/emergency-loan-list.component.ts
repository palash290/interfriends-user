import { Component, OnInit } from '@angular/core';
import { EmergencyLoan } from 'src/app/model/emergencyLoan.model';
import { AuthService } from 'src/app/service/auth.service';
import { LoanService } from 'src/app/service/loan.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-emergency-loan-list',
  templateUrl: './emergency-loan-list.component.html',
  styleUrls: ['./emergency-loan-list.component.css']
})
export class EmergencyLoanListComponent implements OnInit {

  isLoading = true;
  userId: string;
  groupId: string;
  avgAmount: string;
  avgComplete: string;
  status = '1';
  laonPending: EmergencyLoan[] = [];
  laonComplete: EmergencyLoan[] = [];
  laonActive: EmergencyLoan[] = [];

  constructor(
    public loanService: LoanService,
    public authService: AuthService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.groupId = this.authService.getgroupId();
    this.loanService.emergencyLoanList(this.userId, this.groupId).subscribe((response: any) => {
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

  backClicked() {
    this._location.back();
  }

}
