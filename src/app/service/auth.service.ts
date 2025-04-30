import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MessagingService } from './messaging.service';




const API_URL = environment.apiUrl;
@Injectable({ providedIn: 'root' })

export class AuthService {

  private isUserAuthenticated = false;
  private token: string;
  private userId: string;
  private email: string;
  private name: string;
  private profile_image: string;
  private profile_image_thumb: string;
  private group_id: string;
  private authUserStatusListner = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private injector: Injector
  ) { }


  getToken(): any {
    return this.token;
  }

  getIsAuth(): any {
    return this.isUserAuthenticated;
  }

  getUserId(): any {
    return this.userId;
  }

  getEmail(): any {
    return this.email;
  }

  getName(): any {
    return this.name;
  }

  getProfileImage(): any {
    return this.profile_image;
  }


  getProfileImageThumb(): any {
    return this.profile_image_thumb;
  }

  getgroupId(): any {
    return this.group_id;
  }

  getauthUserStatusListner(): any {
    return this.authUserStatusListner.asObservable();
  }


  login(email: string, password: string): any {
    // localStorage.clear();
    const authData = new FormData();
    authData.append('email', email);
    authData.append('password', password);

    this.http.post<{
      success: string,
      message: string,
      user_id: string,
      email: string,
      token: string,
      name: string,
      profile_image: string,
      profile_image_thumb: string,
      group_id: string
    }>(API_URL + '/login', authData)
      .subscribe(response => {
        console.log(response, "response login")
        const token = response.token;
        this.token = token;
        if (response.success === '1' && token) {
          this.isUserAuthenticated = true;
          this.userId = response.user_id;
          this.email = response.email;
          this.name = response.name;
          this.profile_image = response.profile_image;
          this.profile_image_thumb = response.profile_image_thumb;
          this.group_id = response.group_id;
          this.authUserStatusListner.next(true);
          this.sveAuthData(token, this.userId, this.email, this.name, this.profile_image, this.profile_image_thumb, this.group_id);
          this.toastr.success(response.message);
          const messagingService = this.injector.get(MessagingService);
          // notification code start
          console.log('notification code', this.userId);
          messagingService.requestPermission(this.userId);
          // notification code end
          // this.router.navigate(['/user/dashboard']);
          this.router.navigate(['/user/welcome']);
        } else {
          this.toastr.error(response.message);
          this.authUserStatusListner.next(false);

          // location.reload();
        }
      }, error => {
        this.authUserStatusListner.next(false);
      });
  }

  forgot_password(email: string): any {
    const authData = new FormData();
    authData.append('email', email);
    return this.http.post<{ success: string, message: string }>(
      API_URL + '/forgetPassword', authData
    );
  }


  logout(): any {
    const authData = new FormData();
    authData.append('user_id', this.userId);

    // localStorage.clear();
    this.token = null;
    this.isUserAuthenticated = false;
    this.authUserStatusListner.next(false);
    this.userId = null;
    this.email = null;
    this.name = null;
    this.profile_image = null;
    this.profile_image_thumb = null;
    this.group_id = null;
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  autoAuthUser(): any {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }

    this.token = authInformation.token;
    this.isUserAuthenticated = true;
    this.userId = authInformation.userId;
    this.email = authInformation.email;
    this.name = authInformation.name;
    this.profile_image = authInformation.profile_image;
    this.profile_image_thumb = authInformation.profile_image_thumb;
    this.group_id = authInformation.group_id;
    this.authUserStatusListner.next(true);
  }

  public saveName(name: string): any {
    localStorage.setItem('name_interFriendWeb', name);
    this.name = name;
  };


  public registerUser(data: any): any {
    return this.http.post(API_URL + '/Admin/addUserByRecommended', data)
  }



  private sveAuthData(token: string, userId: string, email: string, name: string, profile_image: string, profile_image_thumb: string, group_id: string): any {
    // localStorage.setItem('token_interFriendWeb', token);
    // localStorage.setItem('userId_interFriendWeb', userId);
    // localStorage.setItem('email_interFriendWeb', email);
    // localStorage.setItem('name_interFriendWeb', name);
    // localStorage.setItem('profileImage_interFriendWeb', profile_image);
    // localStorage.setItem('profileImageThumb_interFriendWeb', profile_image_thumb);
    // localStorage.setItem('groupId_interFriendWeb', group_id);

    sessionStorage.setItem('token_interFriendWeb', token);
    sessionStorage.setItem('userId_interFriendWeb', userId);
    sessionStorage.setItem('email_interFriendWeb', email);
    sessionStorage.setItem('name_interFriendWeb', name);
    sessionStorage.setItem('profileImage_interFriendWeb', profile_image);
    sessionStorage.setItem('profileImageThumb_interFriendWeb', profile_image_thumb);
    sessionStorage.setItem('groupId_interFriendWeb', group_id);
  }


  private clearAuthData(): any {
    // localStorage.removeItem('token_interFriendWeb');
    // localStorage.removeItem('userId_interFriendWeb');
    // localStorage.removeItem('email_interFriendWeb');
    // localStorage.removeItem('name_interFriendWeb');
    // localStorage.removeItem('profileImage_interFriendWeb');
    // localStorage.removeItem('profileImageThumb_interFriendWeb');
    // localStorage.removeItem('groupId_interFriendWeb');

    sessionStorage.removeItem('token_interFriendWeb');
    sessionStorage.removeItem('userId_interFriendWeb');
    sessionStorage.removeItem('email_interFriendWeb');
    sessionStorage.removeItem('name_interFriendWeb');
    sessionStorage.removeItem('profileImage_interFriendWeb');
    sessionStorage.removeItem('profileImageThumb_interFriendWeb');
    sessionStorage.removeItem('groupId_interFriendWeb');

  }

  private getAuthData(): any {
    const token = sessionStorage.getItem('token_interFriendWeb');
    const userId = sessionStorage.getItem('userId_interFriendWeb');
    const email = sessionStorage.getItem('email_interFriendWeb');
    const name = sessionStorage.getItem('name_interFriendWeb');
    const profile_image = sessionStorage.getItem('profileImage_interFriendWeb');
    const profile_image_thumb = sessionStorage.getItem('profileImageThumb_interFriendWeb');
    const group_id = sessionStorage.getItem('groupId_interFriendWeb');
    if (!token) {
      return;
    }

    return {
      token: token,
      userId: userId,
      email: email,
      name: name,
      profile_image: profile_image,
      profile_image_thumb: profile_image_thumb,
      group_id: group_id
    }
  }

}
