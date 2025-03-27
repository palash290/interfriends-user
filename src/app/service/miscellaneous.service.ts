import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'


const API_URL = environment.apiUrl;
@Injectable({ providedIn: 'root'})

export class MiscellaneousService {
  constructor(private http: HttpClient, private router: Router) {}

  miscellaneousList(
    user_id: string,
    group_id: string,
    status: string
  ): any {
    const instituteData = new FormData();
    instituteData.append('user_id', user_id);
    instituteData.append('group_id', group_id);
    instituteData.append('status', status);

    return this.http.post<{
      success: string;
      message: string;
      laonPending: any;
      laonComplete: any;
      laonActive: any;
      avgAmount: string;
      avgComplete: string
    }>(
        API_URL + '/miscellaneousList', instituteData
      );
  }


  miscellaneousPaymentList(
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
        API_URL + '/miscellaneousPaymentList', instituteData
      );
  }
}
