import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { MessagingService } from './service/messaging.service';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myApp';
  userId: string;

  constructor(
    private authService: AuthService,
    public messagingService: MessagingService,
    private router: Router,
    public userService: UserService,
  ) { }


  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    // document.documentElement.style.setProperty('--theme-color-1', this.colorCode);
    this.authService.autoAuthUser();
    // notification code start
    this.messagingService.requestPermissionRoot();
    this.messagingService.receiveMessage();
    // notification code end
    this.resetTimer();
  }

  private inactivityTime = 5 * 60 * 1000; // 2 minute in milliseconds
  private timeout: any;

  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  @HostListener('document:click')
  resetTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.logout();
    }, this.inactivityTime);
  }

  logout() {
    this.authService.logout();
    document.getElementById('logoutModal').click();
    //this.toastr.success('You have been logged out successfully');
    this.userService.logout(this.userId).subscribe((response: any) => {

    });
    this.router.navigate(['/']);
  }


}
