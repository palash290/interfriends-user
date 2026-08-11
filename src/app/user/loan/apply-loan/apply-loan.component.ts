import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

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

  constructor(private _location: Location) { }
  ngOnInit(): void { }

  onSelectLoan(type: string) {
    this.loanType = type;
    switch (this.loanType) {
      case '1':
        this.loanTypeText = 'Loan';
        this.textMessage =
          `Not every member qualifies to be accepted for Interfriends (${this.loanTypeText}). To apply, check and clarify with the group Admin to confirm that you meet the minimum requirements before you proceed.

    <p>If you qualify, you can apply for assistance and choose from preset support amounts. Once approved, you can repay the amount monthly over up to 18 months. Terms and conditions apply.</p>`;
        break;
      case '2':
        this.loanTypeText = 'Car Insurance';
        this.textMessage = `
    Not every member qualifies to be accepted for Interfriends Help2Pay (${this.loanTypeText}). To apply, check and clarify with the group Admin to confirm that you meet the minimum requirements before you proceed.

    <p>Interfriends is a co-operative ecosystem focused on circulating and promoting shared prosperity. Depending on your standing in the community, you may be able to have your car insurance paid in full upfront, then repay Interfriends monthly. This can help you avoid the interest charged when paying your insurance company in monthly installments. Terms and conditions apply.</p>
  `;
        break;
      case '3':
        this.loanTypeText = 'Car';
        this.textMessage = `
    Not every member qualifies to be accepted for Interfriends Help2Buy (${this.loanTypeText}). To apply, check and clarify with the group Admin to confirm that you meet the minimum requirements before you proceed.

    <p>This product supports members who want to use our co-operative vision to help purchase a car. Interfriends may provide an agreed amount towards the vehicle, which you then repay monthly. To qualify, you usually need to apply for the scheme and be accepted for at least six months before requesting support. Terms and conditions apply.</p>
  `;
        break;
      case '4':
        this.loanTypeText = 'Credit Card';
        this.textMessage = `
    Not every member qualifies to be accepted for Interfriends Help2Pay (${this.loanTypeText}). To apply, check and clarify with the group Admin to confirm that you meet the minimum requirements before you proceed.

    <p>We understand that saving can be difficult while carrying credit card debt and paying high interest. Where possible, Interfriends may help members clear outstanding credit card balances, then repay Interfriends monthly over time. This support is intended to ease members’ financial burden. Terms and conditions apply.</p>
  `;
        break;
      case '6':
        this.loanTypeText = 'Property';
        this.textMessage = `
    Not every member qualifies to be accepted for Interfriends Help2Buy (${this.loanTypeText}). To apply, check and clarify with the group Admin to confirm that you meet the minimum requirements before you proceed.

    <p>As a co-operative, we aim to help members own their homes. Through the Help2Buy scheme, members can raise funds towards a house deposit. Terms and conditions apply.</p>
  `;
        break;
      case '7':
        this.loanTypeText = 'Welfare';
        this.textMessage = `
    Not every member qualifies to be accepted for Interfriends Welfare. To apply, check and clarify with the group Admin to confirm that you meet the minimum requirements before you proceed.

    <p>This scheme provides support to members during bereavement and helps with hospital expenses for parents, siblings, and close relatives. Terms and conditions apply.</p>
  `;
        break;
      // href="javascript(void);" data-toggle="modal" data-target="#applyWelfareModal"

      case '8':
        this.loanTypeText = 'Travel';
        this.textMessage = `
    Not every member qualifies to be accepted for Interfriends Travel. To apply, check and clarify with the group Admin to confirm that you meet the minimum requirements before you proceed.

    <p>This scheme provides support to members for travel-related expenses. Terms and conditions apply.</p>
  `;
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
    if (type == '7') {
      this.alertConfirmation7();
    }
    if (type == '8') {
      this.alertConfirmation8();
    }
  }

  backClicked() {
    this._location.back();
  }

  alertConfirmation() {
    Swal.fire({
      title: 'PLEASE NOTE:',
      html: this.textMessage, // <-- use html
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById('openModalButton')?.click();
      }
    });
  }

  alertConfirmation7() {
    Swal.fire({
      title: 'PLEASE NOTE:',
      html: this.textMessage,
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        //Swal.fire('Removed!', 'Product removed successfully.', 'success');
        document.getElementById('openModalButton7').click();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('Cancelled', 'Product still in our database.)', 'error');
        console.log('Do nothing');
      }
    });
  }

  alertConfirmation8() {
    Swal.fire({
      title: 'PLEASE NOTE:',
      html: this.textMessage,
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        //Swal.fire('Removed!', 'Product removed successfully.', 'success');
        document.getElementById('openModalButton8').click();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('Cancelled', 'Product still in our database.)', 'error');
        console.log('Do nothing');
      }
    });
  }


}
