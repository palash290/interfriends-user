import { Component, OnInit } from '@angular/core';
import { InvestmentList } from 'src/app/model/investmentList.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-investment-list',
  templateUrl: './investment-list.component.html',
  styleUrls: ['./investment-list.component.css']
})
export class InvestmentListComponent implements OnInit {
  lists: InvestmentList[] = [];
  userId: string;
  groupId: string;
  totalAmount: string;
  isLoading  = true;

  constructor(
    public uerService: UserService,
    public authService: AuthService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.groupId = this.authService.getgroupId();
    this.uerService.investmentList(
      this.groupId,
      this.userId,
      '2'
    ).subscribe((response: any) => {
      this.lists = response.lists;
      this.totalAmount = response.totalAmount;
      this.isLoading = false;
    });
  }

  backClicked() {
    this._location.back();
  }

}
