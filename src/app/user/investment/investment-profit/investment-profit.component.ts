import { Component, OnInit } from '@angular/core';
import { InvestmentList } from 'src/app/model/investmentList.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-investment-profit',
  templateUrl: './investment-profit.component.html',
  styleUrls: ['./investment-profit.component.css']
})
export class InvestmentProfitComponent implements OnInit {

  lists: InvestmentList[] = [];
  userId: string;
  groupId: string;
  isLoading  = true;
  totalAmount: string;

  constructor(
    public uerService: UserService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.groupId = this.authService.getgroupId();
    this.uerService.investmentList(
      this.groupId,
      this.userId,
      '1'
    ).subscribe((response: any) => {
      this.lists = response.lists;
      this.totalAmount = response.totalAmount;
      this.isLoading = false;
    });
  }

}
