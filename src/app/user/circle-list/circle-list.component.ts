import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NotificationList } from 'src/app/model/notificationList.model';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-circle-list',
  templateUrl: './circle-list.component.html',
  styleUrls: ['./circle-list.component.css']
})
export class CircleListComponent implements OnInit {

  lists: NotificationList[] = [];
  userId: string;
  groupId: string;
  isLoading = true;

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

  circleName: any;

  // list code start

  loadInitList() {
    this.isLoader = true;
    this.pageLimit = 0;
    this.uerService.circleList(
      this.pageLimit,
      this.userId
    ).subscribe((response: any) => {
      this.isLoader = false;
      this.isLoading = false;
      this.spinner.hide();
      // debugger
      // this.lists = response.users
      this.circleName = response.circleName;
      //  this.lists = response.users
      //   // .filter((user: any) => user.user_id !== this.userId)
      //   .sort((a: any, b: any) => a.first_name.localeCompare(b.first_name));

      this.lists = response.users
        .sort((a: any, b: any) => {

          const rolePriority: any = {
            'Circle Lead & Deputy Circle Lead': 1,
            'Circle Lead': 2,
            'Deputy Circle Lead': 3
          };

          const priorityA = rolePriority[a.role] || 4;
          const priorityB = rolePriority[b.role] || 4;

          if (priorityA !== priorityB) {
            return priorityA - priorityB;
          }

          return a.first_name.localeCompare(b.first_name);
        });

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
      if (response.lists.length === 0) {
        this.notEmptyPost = false;
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

  userImg1: any;

  showImg(url: any) {
    this.userImg1 = url;
  }


}
