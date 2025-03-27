import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'


const API_URL = environment.apiUrl;
const ADMIN_URL = environment.adminUrl;

@Injectable({ providedIn: 'root'})

export class SavingService {
  constructor(private http: HttpClient, private router: Router) {}

  userSingleCycle(
    group_id: string,
    groupLifecycle_id: string,
    user_id: string
  ): any {
    const userData = new FormData();
    userData.append('group_id', group_id);
    userData.append('groupLifecycle_id', groupLifecycle_id);
    userData.append('user_id', user_id);

    return this.http.post<{
      success: string;
      message: string;
      groupCycleList: any
    }>(
        API_URL + '/getuser_group_by_singlecycle', userData
      );
  }


  groupCycleAll_list(
    group_id: string,
    type: string
  ): any {
    const userData = new FormData();
    userData.append('group_id', group_id);
    userData.append('type', type);

    return this.http.post<{
      success: string;
      message: string;
      lists: any;
    }>(
      API_URL + '/Admin/groupCycleAll_list_web', userData
      );
  }


  payoutDetail(
    group_id: string,
    group_cycle_id: string,
    user_id: string,
  ): any {
    const userData = new FormData();
    userData.append('group_id', group_id);
    userData.append('group_cycle_id', group_cycle_id);
    userData.append('user_id', user_id);

    return this.http.post<{
      success: string;
      message: string;
      payoutCycle: any;
    }>(
      API_URL + '/Admin/payoutDetail', userData
      );
  }



  cylcleAvg(
    group_id: string,
    user_id: string,
    group_cycle_id: string,
    type:string
  ): any {
    const userData = new FormData();
    userData.append('group_id', group_id);
    userData.append('user_id', user_id);
    userData.append('group_cycle_id', group_cycle_id);
    userData.append('type', type)

    return this.http.post<{
      success: string;
      message: string;
      avgAmount: string;
      totalAvgAmount: string;
    }>(
      API_URL + '/cylcleAvg', userData
      );
  }

  cylcleAvgPayout(
    group_id: string,
    user_id: string,
    group_cycle_id: string
  ): any {
    const userData = new FormData();
    userData.append('group_id', group_id);
    userData.append('user_id', user_id);
    userData.append('group_cycle_id', group_cycle_id);

    return this.http.post<{
      success: string;
      message: string;
      avgAmount: string;
      totalAvgAmount: string;
    }>(
      API_URL + '/cylcleAvgPayout', userData
      );
  }



}
