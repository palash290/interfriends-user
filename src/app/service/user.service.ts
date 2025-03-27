import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';


const API_URL = environment.apiUrl;
@Injectable({ providedIn: 'root'})

export class UserService {

constructor(
  private http: HttpClient ,
  private router: Router,
  private toastr: ToastrService,
  private authService: AuthService) {}



  dashbaord(instituteId: string): any {
    const authData = new FormData();
    authData.append('institute_id', instituteId);
    return this.http.post<{
      success: string,
      message: string,
      userCount: number,
      productCount: number,
      categoryCount: number
    }>(
        API_URL + '/dashbaord', authData
      );
  }

  getCreditScoreForDasboard(){
    return this.http.get<{
      success: string;
      message: string;
      credit_score_list: any;
    }>(
        API_URL + '/allCreditScoreList',
      );
  }

  getUserDetail(userId: string): any {
    const authData = new FormData();
    authData.append('user_id', userId);
    return this.http.post<{
      success: string,
      message: string,
      userInfo: any
    }>(
        API_URL + '/getUserDetail', authData
      );
  }

  updateProfile(
    userId: string,
    name: string,
    email: string,
    phone: string
    ): any {
    const authData = new FormData();
    authData.append('name', name);
    authData.append('email', email);
    authData.append('phone', phone);
    authData.append('user_id', userId);
    return this.http.post<{
      success: string,
      message: string
    }>(
        API_URL + '/updateProfile', authData
      );
  }

  resetForgetPassword(password: string, token: string): any {
    const userData = new FormData();
    userData.append('token', token);
    userData.append('password', password);
    return this.http.post<{
      success: string;
      message: string;
    }>(
        API_URL + '/resetForgetPassword', userData
      );
  }


  verifyUser(password: string, token: string): any {
    const userData = new FormData();
    userData.append('token', token);
    userData.append('password', password);
    return this.http.post<{
      success: string;
      message: string;
    }>(
        API_URL + '/verifyUser', userData
      );
  }


  forgetPassword(email: string): any {
    const userData = new FormData();
    userData.append('email', email);
    return this.http.post<{
      success: string;
      message: string;
    }>(
        API_URL + '/forgetPassword', userData
      );
  }




  forgot_password(email: string): any {
    const authData = new FormData();
    authData.append('email', email);
    return this.http.post<{
      success: string,
      message: string
    }>(
        API_URL + '/forgetPassword', authData
      );
  }

  resetPassword(password: string, confirmPassword: string, userId: string) {

    const userData = new FormData();

    userData.append('password', password);
    userData.append('confpassword', confirmPassword);
    userData.append('user_id', userId);

    return this.http.post<{
      success: string;
      message: string;
    }>(
        API_URL + '/resetPassword', userData
      );
  }

  addPrivacyPolicy(
    info: string,
  ): any {
    const userData = new FormData();
    userData.append('info', info);

    return this.http.post<{
      success: string;
      message: string;
    }>(
        API_URL + '/addPrivacyPolicy', userData
      );
  }

  getPrivacyPolicyInfo(
    ): any {
      return this.http.get<{
        success: string;
        message: string;
        privacyInfo: string;
      }>(
          API_URL + '/getPrivacyPolicyInfo'
        );
    }



    getTermsInfo(
      ): any {
        return this.http.get<{
          success: string;
          message: string;
          termsInfo: string;
        }>(
            API_URL + '/getTermsInfo'
          );
      };

      
      getLast5trancstionUserInfo(userId: string): any {
        const authData = new FormData();
        authData.append('user_id', userId);
        return this.http.post<{
          success: string,
          message: string,
          userinfo: any
        }>(
            API_URL + '/lastTransactionsUserCycle', authData
          );
      }


      addTerms(
        info: string,
      ): any {
        const userData = new FormData();
        userData.append('info', info);

        return this.http.post<{
          success: string;
          message: string;
        }>(
            API_URL + '/addTerms', userData
          );
      }


      getUserInfo(userId: string): any {
        const authData = new FormData();
        authData.append('user_id', userId);
        return this.http.post<{
          success: string,
          message: string,
          userinfo: any
        }>(
            API_URL + '/userDetailInfo', authData
          );
      }


      all_user_list(): any {
        const authData = new FormData();
        authData.append('user_id', '1');
        return this.http.post<{
          success: string,
          message: string,
          userInfo: any
        }>(
            API_URL + '/all_user_list', authData
          );
      }


      chekgroupLifeCycleExist(id: string): any {
        const authData = new FormData();
        authData.append('group_id', id);
        return this.http.post<{
          success: string,
          message: string,
          groupDetail: any,
          showStatus: boolean,
          showMessage: string
        }>(
            API_URL + '/chekgroupLifeCycleExist', authData
          );
      }


      pfList(group_id: string, user_id: string): any {
        const authData = new FormData();
        authData.append('group_id', group_id);
        authData.append('user_id', user_id);
        return this.http.post<{
          success: string,
          message: string,
          pfList: any,
          pfAmount: string,
          pf_interest: string
        }>(
            API_URL + '/pfList', authData
          );
      }

      
      pfListFilter(group_id: string, user_id: string, main_id : string): any {
        const authData = new FormData();
        authData.append('group_id', group_id);
        authData.append('user_id', user_id);
        authData.append('main_id', main_id);
        return this.http.post<{
          success: string,
          message: string,
          pfList: any,
          pfAmount: string,
          pf_interest: string
        }>(
            API_URL + '/pfList', authData
          );
      }

      safeKeepingList(group_id: string, user_id: string): any {
        const authData = new FormData();
        authData.append('group_id', group_id);
        authData.append('user_id', user_id);
        return this.http.post<{
          success: string,
          message: string,
          safeKeepingList: any,
          safeKeepingAmount: string
        }>(
            API_URL + '/safeKeepingList', authData
          );
      }



      requestSafeKeepingWithdral(
        group_id: string,
        user_id: string,
        amount: string,
        date: string,
        reason: string,
        type:string
        ): any {
        const authData = new FormData();
        authData.append('group_id', group_id);
        authData.append('user_id', user_id);
        authData.append('amount', amount);
        authData.append('date', date);
        authData.append('reason', reason);
        authData.append('type', type);
        return this.http.post<{
          success: string,
          message: string,
        }>(
            API_URL + '/requestSafeKeepingWithdral', authData
          );
      }

      requestInvestment(
        group_id: string,
        user_id: string,
        amount: string,
        phone_number: string,
        message: string,
        property_id: string
        ): any {
        const authData = new FormData();
        authData.append('group_id', group_id);
        authData.append('user_id', user_id);
        authData.append('amount', amount);
        authData.append('phone_number', phone_number);
        authData.append('message', message);
        authData.append('property_id', property_id);

        return this.http.post<{
          success: string,
          message: string,
        }>(
            API_URL + '/requestInvestment', authData
          );
      }




      avgAmount(group_id: string, user_id: string): any {
        const authData = new FormData();
        authData.append('group_id', group_id);
        authData.append('user_id', user_id);
        return this.http.post<{
          success: string,
          message: string,
          avgAmountSafeKeeping: string,
          avgAmountCycle: string,
          avgAmountLoan: string,
          avgAmountPf: string,
          avgAmountEmergencyLoan: string,
          totalAmountInvestment: string,
          totalAmountDivided: string,
          total_credit_score: string
        }>(
            API_URL + '/avgAmount', authData
          );
      }


      avgSaving(group_id: string, user_id: string): any {
        const authData = new FormData();
        authData.append('group_id', group_id);
        authData.append('user_id', user_id);
        return this.http.post<{
          success: string,
          message: string,
          avgAmountCycle: string,
        }>(
            API_URL + '/avgSaving', authData
          );
      }

      avgSavingJNR(group_id: string, user_id: string): any {
        const authData = new FormData();
        authData.append('group_id', group_id);
        authData.append('user_id', user_id);
        return this.http.post<{
          success: string,
          message: string,
          avgAmountCycle: string,
        }>(
            API_URL + '/avgSavingJNR', authData
          );
      }



      avgSavingHelpToBuy(group_id: string, user_id: string): any {
        const authData = new FormData();
        authData.append('group_id', group_id);
        authData.append('user_id', user_id);
        return this.http.post<{
          success: string,
          message: string,
          avgAmountCycle: string,
        }>(
            API_URL + '/avgSavingHelpToBuy', authData
          );
      }


      logout(userId: string): any {
        const authData = new FormData();
        authData.append('user_id', userId);
        return this.http.post<{
          success: string,
          message: string
        }>(
            API_URL + '/logout', authData
          );
      }


      recommendUser(
        name: string,
        email: string,
        mobile_number: string,
        friend_employed: string,
        employement_type: string,
        know_this_person: string,
        know_them_as_what: string,
        recommending_this_person: string,
        refer_user_id: string
        ): any {
        const authData = new FormData();
        let userId = this.authService.getUserId();
        let groupId = this.authService.getgroupId();
        authData.append('user_id', userId);
        authData.append('group_id', groupId);
        authData.append('name', name);
        authData.append('email', email);
        authData.append('mobile_number', mobile_number);
        authData.append('friend_employed', friend_employed);
        authData.append('employement_type', employement_type);
        authData.append('know_this_person', know_this_person);
        authData.append('know_them_as_what', know_them_as_what);
        authData.append('recommending_this_person', recommending_this_person);
        authData.append('refer_user_id', refer_user_id);
        return this.http.post<{
          success: string,
          message: string,
        }>(
            API_URL + '/recommendUser', authData
          );
      }


      contactUs(
        name: string,
        email: string,
        mobile_number: string,
        message: string,
        ): any {
        const authData = new FormData();
        let userId = this.authService.getUserId();
        authData.append('user_id', userId);
        authData.append('name', name);
        authData.append('email', email);
        authData.append('mobile_number', mobile_number);
        authData.append('message', message);
        return this.http.post<{
          success: string,
          message: string,
        }>(
            API_URL + '/contactUs', authData
          );
      }


      help(
        name: string,
        type: string,
        message: string,
        ): any {
        const authData = new FormData();
        let userId = this.authService.getUserId();
        authData.append('user_id', userId);
        authData.append('name', name);
        authData.append('type', type);
        authData.append('message', message);
        return this.http.post<{
          success: string,
          message: string,
        }>(
            API_URL + '/help', authData
          );
      }




      investmentList(group_id: string, user_id: string, payment_status: string): any {
        const authData = new FormData();
        authData.append('group_id', group_id);
        authData.append('user_id', user_id);
        authData.append('payment_status', payment_status);

        return this.http.post<{
          success: string,
          message: string,
          lists: any,
          totalAmount: string;
        }>(
            API_URL + '/investment_list', authData
          );
      }


      propertyImage(property_id: string): any {
        const authData = new FormData();
        authData.append('property_id', property_id);
        return this.http.post<{
          success: string,
          message: string,
          property_image: any
        }>(
            API_URL + '/propertyImage', authData
          );
      }


      propertyList(
        ofset: number
      ): any {
        const audioData = new FormData();
        audioData.append('start', ofset.toString());
        return this.http.post<{
          success: string,
          message: string,
          lists: any
        }>(
            API_URL + '/property_list', audioData
          );
      }


      notificationList(
        ofset: number,
        userId: string
      ): any {
        const audioData = new FormData();
        audioData.append('start', ofset.toString());
        audioData.append('user_id', userId);
        return this.http.post<{
          success: string,
          message: string,
          lists: any
        }>(
            API_URL + '/notification_list', audioData
          );
      }


      getNotificationCount(
      ): any {
        const audioData = new FormData();
        let userId = this.authService.getUserId();
        audioData.append('user_id', userId);
        return this.http.post<{
          success: string,
          message: string,
          count: number
        }>(
            API_URL + '/get_notification_count', audioData
          );
      }



      allUserList(
        group_id: string
        ): any {
          const userData = new FormData();
          let userId = this.authService.getUserId();
          userData.append('group_id', group_id);
          userData.append('user_id', userId);
          return this.http.post<{
            success: string,
            message: string,
            userList: any
          }>(
              API_URL + '/Admin/recommendUserlistcircle', userData
            );
        };

      allRecommnedUserList(
        group_id: string
        ): any {
          const userData = new FormData();
          let userId = this.authService.getUserId();
          userData.append('user_id', userId);
          return this.http.post<{
            success: string,
            message: string,
            userList: any
          }>(
              API_URL + '/Admin/recommendUserlistcircle', userData
            );
        }


        getCharts(Id: string) {
          const chartData = new FormData();
          chartData.append('id', Id);

          return this.http.post<{
            success: string;
            message: string;
            chartData: any;
            chartLabels: any;
            }>(
              API_URL + '/getchart', chartData
          );
        }



        editUser(
          user_id: string,
          first_name: string,
          last_name: string,
          email: string,
          dob: string,
          mobile_number: string,
          home_number: string,
          emergency_number: string,
          kin_name: string,
          kin_number: string,
          address_line_1: string,
          address_line_2: string,
          post_code: string,
          city: string,
          image: string,
          employement_type: string
        ): any {
          const userData = new FormData();
          userData.append('user_id',user_id);
          userData.append('first_name',first_name);
          userData.append('last_name',last_name);
          userData.append('email',email);
          userData.append('dob',dob);
          userData.append('mobile_number',mobile_number);
          userData.append('home_number',home_number);
          userData.append('emergency_number',emergency_number);
          userData.append('kin_name',kin_name);
          userData.append('kin_number',kin_number);
          userData.append('address_line_1',address_line_1);
          userData.append('address_line_2',address_line_2);
          userData.append('post_code',post_code);
          userData.append('city',city);
          userData.append('image',image);
          userData.append('employement_type',employement_type);

          return this.http.post<{
            success: string;
            message: string;
          }>(
              API_URL + '/editUser', userData
            );
        }


        updateWebToken(
          userId: string,
          web_token: string
          ): any {
            console.log('updateWebToken__________');
          const authData = new FormData();
          authData.append('user_id', userId);
          authData.append('web_token', web_token);
          return this.http.post<{
            success: string,
            message: string,
            userinfo: any
          }>(
              API_URL + '/updateProfile', authData
            );
        }


}
