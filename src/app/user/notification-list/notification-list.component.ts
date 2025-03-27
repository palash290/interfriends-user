import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/model/property.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationList } from 'src/app/model/notificationList.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  lists: NotificationList[] = [];
  userId: string;
  groupId: string;
  isLoading  = true;

  pageLimit: number;
  notEmptyPost = true;
  notscrolly = true;
  isLoader = true;


  constructor(
    public uerService: UserService,
    public authService: AuthService,
    private spinner: NgxSpinnerService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.groupId = this.authService.getgroupId();
    this.pageLimit = 0;
    this.notEmptyPost = true;
    this.notscrolly = true;
    this.isLoader = true;
    this.loadInitList();
  }


  // list code start

  loadInitList() {
    this.isLoader = true;
    this.pageLimit = 0;
    this.uerService.notificationList(
      this.pageLimit,
      this.userId
      ).subscribe((response: any) => {
        this.isLoader = false;
        this.isLoading = false;
        this.spinner.hide();
        if (response.lists.length === 0 ) {
          this.notEmptyPost =  false;
        }

        for (const value of response.lists) {
          this.lists.push(value);
        }
        console.log(this.lists)

        this.notscrolly = true;
     });
  }


  loadNextList() {
      this.pageLimit += 10;
      this.uerService.notificationList(
        this.pageLimit,
        this.userId
        ).subscribe((response: any) => {
          this.spinner.hide();
          if (response.lists.length === 0 ) {
            this.notEmptyPost =  false;
          }

          for (const value of response.lists) {
            this.lists.push(value);
          }

          this.notscrolly = true;
      });
  }

  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      this.spinner.show();
      this.notscrolly = false;
      this.loadNextList();
     }
   }

  // list code end

  backClicked() {
    this._location.back();
  }

}
