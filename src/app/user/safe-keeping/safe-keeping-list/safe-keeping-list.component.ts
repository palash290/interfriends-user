import { Component, OnInit } from '@angular/core';
import { SafeKeepingList } from 'src/app/model/safeKeeping.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-safe-keeping-list',
  templateUrl: './safe-keeping-list.component.html',
  styleUrls: ['./safe-keeping-list.component.css']
})
export class SafeKeepingListComponent implements OnInit {

  safeKeepingList: SafeKeepingList[]= [];
  safeKeepingAmount: string;
  isLoading = true;
  groupId: string;
  userId: string;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.groupId = this.authService.getgroupId();
    this.userId = this.authService.getUserId();
    this.isLoading = true;
    this.userService.safeKeepingList(this.groupId, this.userId).subscribe((response: any) => {
      this.safeKeepingList = response.safeKeepingList;
      this.safeKeepingAmount = response.safeKeepingAmount;
      this.isLoading = false;
    });
  }

  backClicked() {
    this._location.back();
  }

}
