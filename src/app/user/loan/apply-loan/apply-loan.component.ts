import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.css'],
})
export class ApplyLoanComponent implements OnInit {
  loanType: string;
  eachChange: string;
  display = 'none';
  loanTypeText: string;
  textMessage: string;

  constructor(private _location: Location) {}
  ngOnInit(): void {}

  onSelectLoan(type: string) {
    this.loanType = type;
    switch (this.loanType) {
      case '1':
        this.loanTypeText = 'Loan';
        this.textMessage =
          'Not every member qualifies to be accepted for Interfriends (' +
          this.loanTypeText +
          '). To apply, check and clarify with the group Admin to confirm that you meet the minimum requirements before you proceed.';
        break;
      case '2':
        this.loanTypeText = 'Car Insurance';
        this.textMessage =
          'Not every member qualifies to be accepted for Interfriends Help2Pay (' +
          this.loanTypeText +
          '). To apply, check and clarify with the group Admin to confirm that you meet the minimum requirements before you proceed.';
        break;
      case '3':
        this.loanTypeText = 'Car';
        this.textMessage =
          'Not every member qualifies to be accepted for Interfriends Help2Buy (' +
          this.loanTypeText +
          '). To apply, check and clarify with the group Admin to confirm that you meet the minimum requirements before you proceed.' +
          '\nOnce accepted, monthly payments start immediately and payout starts after 6 months';
        break;
      case '4':
        this.loanTypeText = 'Credit Card';
        this.textMessage =
          'Not every member qualifies to be accepted for Interfriends Help2Pay (' +
          this.loanTypeText +
          '). To apply, check and clarify with the group Admin to confirm that you meet the minimum requirements before you proceed.';
        break;
      case '6':
        this.loanTypeText = 'Property';
        this.textMessage =
          'Not every member qualifies to be accepted for Interfriends Help2Buy (' +
          this.loanTypeText +
          '). To apply, check and clarify with the group Admin to confirm that you meet the minimum requirements before you proceed.' +
          '\nOnce accepted, monthly payments start immediately and payout starts after 40 months.T&C apply.';
        break;
      default:
        this.loanTypeText = 'Other';
        this.textMessage =
          'Not every member qualifies to be accepted for Interfriends Help2Buy (' +
          this.loanTypeText +
          '). To apply, check and clarify with the group Admin to confirm that you meet the minimum requirements before you proceed.' +
          '\nOnce accepted, monthly payments start immediately and payout starts after 12 months';
        break;
        }
    this.eachChange = Math.random().toString();
    this.alertConfirmation();
  }

  backClicked() {
    this._location.back();
  }

  alertConfirmation() {
    Swal.fire({
      title: 'PLEASE NOTE:',
      text: this.textMessage,
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        /*Swal.fire('Removed!', 'Product removed successfully.', 'success');*/
        document.getElementById('openModalButton').click();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        /*Swal.fire('Cancelled', 'Product still in our database.)', 'error');*/
        console.log('Do nothing');
      }
    });
  }
}
