import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'


const API_URL = environment.apiUrl;
@Injectable({ providedIn: 'root'})

export class LoanService {
  constructor(private http: HttpClient, private router: Router) {}

  requestLoan(
    user_id: string,
    group_id: string,
    loan_amount: string,
    tenure: string,
    contact_number: string,
    loan_type: string,
    gurarantor: string,
    document_image: string,
    creditCardImage : string,
    pay_date: string,
    total40month : string,
    provident : string,
    admin_risk : string,
    loan_emi : string
  ): any {
    const instituteData = new FormData();
    instituteData.append('user_id', user_id);
    instituteData.append('group_id', group_id);
    instituteData.append('loan_amount', loan_amount);
    instituteData.append('tenure', tenure);
    instituteData.append('contact_number', contact_number);
    instituteData.append('loan_type', loan_type);
    instituteData.append('gurarantor', gurarantor);
    instituteData.append('document_image', document_image);
    instituteData.append('creditCardImage', creditCardImage);
    instituteData.append('pay_date', pay_date);
    instituteData.append('total_payment', total40month)
    instituteData.append('provident', provident)
    instituteData.append('admin_risk', admin_risk)
    instituteData.append('loan_emi', loan_emi)

    return this.http.post<{
      success: string;
      message: string;
    }>(
        API_URL + '/request_loan', instituteData
      );
  }



  addEmergencyLoan(
    user_id: string,
    group_id: string,
    loan_amount: string,
    pay_by: string,
    contact_number: string,
    gurarantor: string,
  ): any {
    const instituteData = new FormData();
    instituteData.append('user_id', user_id);
    instituteData.append('group_id', group_id);
    instituteData.append('loan_amount', loan_amount);
    instituteData.append('pay_by', pay_by);
    instituteData.append('contact_number', contact_number);
    instituteData.append('gurarantor', gurarantor);

    return this.http.post<{
      success: string;
      message: string;
    }>(
        API_URL + '/addEmergencyLoan', instituteData
      );
  }

  loanList(
    user_id: string,
    group_id: string,
    status: string,
    loan_type : string
  ): any {
    const instituteData = new FormData();
    instituteData.append('user_id', user_id);
    instituteData.append('group_id', group_id);
    instituteData.append('status', status);
    instituteData.append('loan_type', loan_type)

    return this.http.post<{
      success: string;
      message: string;
      laonPending: any;
      laonComplete: any;
      laonActive: any;
      avgAmount: string;
      avgComplete: string
    }>(
        API_URL + '/loanList', instituteData
      );
  }


  welfareList(
    user_id: string,
    group_id: string,

  ): any {
    const instituteData = new FormData();
    instituteData.append('user_id', user_id);
    instituteData.append('group_id', group_id);
    return this.http.post<{
      success: string;
      message: string;
      laonPending: any;
      laonComplete: any;
      laonActive: any;
      avgAmount: string;
      avgComplete: string
    }>(
        API_URL + '/welfareList', instituteData
      );
  }


  emergencyLoanList(
    user_id: string,
    group_id: string
  ): any {
    const instituteData = new FormData();
    instituteData.append('user_id', user_id);
    instituteData.append('group_id', group_id);

    return this.http.post<{
      success: string;
      message: string;
      laonPending: any;
      laonComplete: any;
      laonActive: any;
      avgAmount: string;
      avgComplete: string;
    }>(
        API_URL + '/emergencyLoanList', instituteData
      );
  }


  loanPaymentList(
    user_id: string,
    group_id: string,
    loanId: string
  ): any {
    const instituteData = new FormData();
    instituteData.append('user_id', user_id);
    instituteData.append('group_id', group_id);
    instituteData.append('loan_id', loanId);

    return this.http.post<{
      success: string;
      message: string;
      paymentList: any;
    }>(
        API_URL + '/loanPaymentList', instituteData
      );
  }

  all_loan_list(): any {
    return this.http.get<{
      success: string;
      message: string;
      loanList: any;
    }>(
        API_URL + '/all_loan_list',
      );
  }

  help2BuyList(
    user_id: string,
    group_id: string,
  ): any {
    const instituteData = new FormData();
    instituteData.append('user_id', user_id);
    instituteData.append('group_id', group_id);

    return this.http.post<{
      success: string;
      message: string;
      paymentList: any;
    }>(
        API_URL + '/help2buylist', instituteData
      );
  }


}
