import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InvestmentList } from 'src/app/model/investmentList.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-investment-profit',
  templateUrl: './investment-profit.component.html',
  styleUrls: ['./investment-profit.component.css']
})
export class InvestmentProfitComponent implements OnInit {

  lists: InvestmentList[] = [];
  dividendYearOptions: Array<{ id: string; year: string; totalDividend: string }> = [];
  userId: string;
  groupId: string;
  isLoading = true;
  totalAmount: string;
  display1: string = 'none';
  dividendId: any;
  selectedDividendYear = '';
  selectedDividend: { id: string; year: string; totalDividend: string } | null = null;
  isPayoutLoading = false;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.groupId = this.authService.getgroupId();
    this.userService.dividendList(
      this.groupId,
      this.userId,
      '1'
    ).subscribe((response: any) => {
      // this.lists = response.lists || [];
      // this.dividendYearOptions = this.lists.map((item: any) => ({
      //   id: String(item?.id || ''),
      //   year: String(item?.dividend_year || ''),
      //   totalDividend: String(item?.total_dividend || '0.00')
      // }));
      // this.totalAmount = response.summary.total_dividend;
      // this.isLoading = false;
      this.lists = response.lists || [];

      this.dividendYearOptions = this.lists
        .filter((item: any) => String(item?.status) !== '1')
        .map((item: any) => ({
          id: String(item?.id || ''),
          year: String(item?.dividend_year || ''),
          totalDividend: String(item?.total_dividend || '0.00')
        }));

      this.totalAmount = response.summary.balance_amount;
      this.isLoading = false;
    });
  }

  showPayoutModal() {
    this.display1 = "block";
    this.selectedDividendYear = '';
    this.selectedDividend = null;
    this.dividendId = '';
  }

  onClose() {
    this.display1 = "none";
  }

  onDividendYearChange(): void {
    this.selectedDividend = this.dividendYearOptions.find(
      (item) => item.year === this.selectedDividendYear
    ) || null;
    this.dividendId = this.selectedDividend?.id || '';
  }

  onPayout() {
    if (!this.selectedDividend) {
      this.toastr.error('Please select a dividend year.');
      return;
    }

    this.isPayoutLoading = true;

    this.userService.addPayoutDev(this.userId, this.selectedDividend.id)
      .pipe(finalize(() => {
        this.isPayoutLoading = false;
      }))
      .subscribe((response: any) => {
        if (response.success === '1') {
          this.toastr.success(response.message);
          document.getElementById('closepayout')?.click();
        } else {
          this.toastr.error(response.message);
        }
        this.ngOnInit();
      });

  }

}
