import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'


const API_URL = environment.apiUrl;
const ADMIN_URL = environment.adminUrl;

@Injectable({
  providedIn: 'root'
})
export class TermandconditionService {

  constructor(private http : HttpClient) { }

  getTermAndcondition(){
    return this.http.get<{
      success: string;
      message: string;
      termsInfo : any;
    }>(
      API_URL + '/Admin/getTermsInfo',
      );
  }
}
