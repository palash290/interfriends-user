import { Component, OnInit } from '@angular/core';
import { UserList } from 'src/app/model/userList.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  userId: any;
  userDetail: UserList;

  constructor(public userService: UserService, public authService: AuthService,) { }

  ngOnInit(): void {

    this.userId = this.authService.getUserId();

    this.userService.getUserInfo(this.userId).subscribe((response: any) => {
      this.userDetail = response.userinfo;
      console.log(this.userDetail, 'userDetail');
    });

  }


}
