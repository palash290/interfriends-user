import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name: string;
  profileImage: string;
  image: string;
  showMenu = true;
  notificationCount: number;
  userId: string;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    ) {}

  ngOnInit(): void {
    this.profileImage = this.authService.getProfileImage();
    this.name = this.authService.getName();
    this.image = 'assets/img/profile.jpg';
    this.userId = this.authService.getUserId();


    this.userService.getNotificationCount().subscribe((response : any) => {
      this.notificationCount = response.count;
    });
  }

  onLogout(): void {
    this.authService.logout();
    document.getElementById('logoutModal').click();
    this.toastr.success('You have been logged out successfully');
    this.userService.logout(this.userId).subscribe((response: any) => {

    });
    this.router.navigate(['/']);
  }

  onToggleMenu() {
    return this.showMenu = !this.showMenu;
  }
}
