import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Loan } from 'src/app/model/loan.model';
import { AuthService } from 'src/app/service/auth.service';
import { LoanService } from 'src/app/service/loan.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/service/shared.service';
import { UserService } from 'src/app/service/user.service';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';


@Component({
    selector: 'app-welfare-loan',
    templateUrl: './welfare-loan.component.html',
    styleUrls: ['./welfare-loan.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class WelfareLoanComponent implements OnInit {

  isLoading = true;
  isLoadingBtn = false;
  userId: string;
  groupId: string;
  avgAmount: any;
  avgComplete: any;
  status = '1';
  laonPending: Loan[] = [];
  laonComplete: Loan[] = [];
  laonActive: Loan[] = [];
  welfare_loan_id: any;
  payout_amount: any;
  group_id: any;
  circleUsers: any[] = [];
  claimFormData: any = {
    seconder1_user_id: '',
    seconder2_user_id: '',
    beneficiary: '',
    beneficiary_other: '',
    claim_reason: '',
    claim_reason_other: ''
  };

  constructor(
    public loanService: LoanService,
    public authService: AuthService,
    private _location: Location,
    private toastr: ToastrService,
    public sharedService: SharedService,
    public uerService: UserService,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.groupId = this.authService.getgroupId();
    this.isLoading = true;
    this.loanService.welfareList(this.userId, this.groupId)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: (response: any) => {
          this.laonPending = (response?.listPending || []).reverse();
          this.laonComplete = response?.listComplete || [];
          this.laonActive = (response?.listActive || []).reverse();
          this.avgAmount = response?.avgAmount ?? 0;
          this.avgComplete = response?.avgComplete ?? 0;

          const activeLoan = this.laonActive[0];
          if (activeLoan) {
            this.welfare_loan_id = activeLoan.id;
            this.payout_amount = activeLoan.loan_amount;
            this.group_id = activeLoan.group_id;
          } else {
            this.welfare_loan_id = null;
            this.payout_amount = null;
            this.group_id = null;
          }
        },
        error: (error: any) => {
          console.error('Welfare list load error:', error);
          this.laonPending = [];
          this.laonComplete = [];
          this.laonActive = [];
          this.avgAmount = 0;
          this.avgComplete = 0;
          this.welfare_loan_id = null;
          this.payout_amount = null;
          this.group_id = null;
          this.toastr.error('Unable to load welfare loans. Please try again.');
        }
      });
    this.circleList();
  }


  onSetStatus(status: string) {
    this.status = status;
  }

  canShowClaimWelfare(): boolean {
    return Number(this.avgComplete) > 0;
  }

  circleList() {
    this.uerService.circleList('', this.userId).subscribe((response: any) => {
      this.circleUsers = response.users || [];
    });
  }

  getFilteredSeconder2Users() {
    return (this.circleUsers || []).filter((item: any) => {
      return String(item.user_id) !== String(this.claimFormData.seconder1_user_id);
    });
  }

  onSeconder1Change(value: string) {
    this.claimFormData.seconder1_user_id = value;
    if (String(this.claimFormData.seconder2_user_id) === String(value)) {
      this.claimFormData.seconder2_user_id = '';
    }
  }


  onAddHistory(status: string, index: number, id: string) {
    this.loanService.loanPaymentList(this.userId, this.groupId, id).subscribe((response: any) => {
      if (status == '1') {
        // debugger
        if (this.laonActive[index]['payment_list'].length >= 0 && this.laonActive[index]['payment_list_status'] == true) {
          this.laonActive[index]['payment_list'] = response.paymentList;
          this.laonActive[index]['payment_list_status'] = false;
        }
      }

      if (status == '2') {
        if (this.laonComplete[index]['payment_list'].length >= 0 && this.laonComplete[index]['payment_list_status'] == true) {
          this.laonComplete[index]['payment_list'] = response.paymentList;
          this.laonComplete[index]['payment_list_status'] = false;
        }
      }
    });
  }

  displayClaim: string = 'none';

  showPayoutModal() {
    this.displayClaim = "block";
    this.claimFormData = {
      seconder1_user_id: '',
      seconder2_user_id: '',
      beneficiary: '',
      beneficiary_other: '',
      claim_reason: '',
      claim_reason_other: ''
    };
  }

  onClose(claimForm?: NgForm) {
    if (claimForm) {
      claimForm.resetForm();
    }
    this.displayClaim = "none";
    this.claimFormData = {
      seconder1_user_id: '',
      seconder2_user_id: '',
      beneficiary: '',
      beneficiary_other: '',
      claim_reason: '',
      claim_reason_other: ''
    };
  }

  onClaim(claimForm: NgForm) {
    this.isLoadingBtn = true;

    if (
      claimForm.invalid ||
      this.claimFormData.seconder1_user_id === this.claimFormData.seconder2_user_id
    ) {
      this.isLoadingBtn = false;
      this.toastr.error('Please complete all required fields.');
      return;
    }

    const formURlData = new FormData();
    formURlData.set('welfare_loan_id', this.welfare_loan_id);
    formURlData.set('user_id', this.userId);
    formURlData.set('payout_amount', this.payout_amount);
    formURlData.set('claim_reason', this.claimFormData.claim_reason);
    formURlData.set('beneficiary', this.claimFormData.beneficiary);
    formURlData.set('seconder1_user_id', this.claimFormData.seconder1_user_id);
    formURlData.set('seconder2_user_id', this.claimFormData.seconder2_user_id);
    formURlData.set('group_id', this.group_id);

    const payload = {
      welfare_loan_id: this.welfare_loan_id,
      user_id: this.userId,
      payout_amount: this.payout_amount,
      // claim_reason: this.claimFormData.claim_reason === 'Other'
      //   ? this.claimFormData.claim_reason_other
      //   : this.claimFormData.claim_reason,
      // beneficiary: this.claimFormData.beneficiary === 'Other'
      //   ? this.claimFormData.beneficiary_other
      //   : this.claimFormData.beneficiary,
      claim_reason: this.claimFormData.claim_reason,
      beneficiary: this.claimFormData.beneficiary,
      claim_reason_other: this.claimFormData.claim_reason_other,
      beneficiary_other: this.claimFormData.beneficiary_other,
      seconder1_user_id: this.claimFormData.seconder1_user_id,
      seconder2_user_id: this.claimFormData.seconder2_user_id,
      group_id: this.group_id
    }

    this.sharedService.postAPI('/submitWelfareClaim', payload)
      .subscribe({
        next: (response: any) => {
          this.isLoadingBtn = false;

          if (response.success === '1') {
            this.toastr.success(response.message);
            this.onClose(claimForm);
            this.ngOnInit();
          } else {
            this.toastr.error(response.message);
          }
        },
        error: (error) => {
          this.isLoadingBtn = false;

          console.error('Submit Welfare Claim Error:', error);

          this.toastr.error(
            error?.error?.message || 'Something went wrong. Please try again.'
          );
        }
      });
  }

  backClicked() {
    this._location.back();
  }


}
