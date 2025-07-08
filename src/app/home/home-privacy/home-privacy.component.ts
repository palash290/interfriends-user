import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { TermandconditionService } from 'src/app/service/termandcondition.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home-privacy',
  templateUrl: './home-privacy.component.html',
  styleUrls: ['./home-privacy.component.css']
})
export class HomePrivacyComponent implements OnInit {


  userId: string;
  isLoading = true;
  info: string;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.authService.getUserId();

    this.userService.getPrivacyPolicyInfo().subscribe((response: any) => {
      this.info = response.privacyInfo;
      this.isLoading = false;
    });
  }


  /*   onSave(): any {
      if(this.info) {
      } else {
        this.toastr.error('Please enter info');
        return;
      }
  
      this.userService.addPrivacyPolicy(
        this.info
        ).subscribe((response: any) => {
          this.isLoading = false;
          if (response.success === '1') {
            this.toastr.success(response.message);
          } else {
            this.toastr.error(response.message);
          }
      });
    }
   */
  checkAdminType() {
    if (localStorage.getItem('admin_type_interFriendAdmin') === '2') {
      return true;
    } else {
      return false;
    }
  }


}
