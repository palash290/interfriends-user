import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InvestmentList } from 'src/app/model/investmentList.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-investment-profit',
    templateUrl: './investment-profit.component.html',
    styleUrls: ['./investment-profit.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class InvestmentProfitComponent implements OnInit {

  lists: InvestmentList[] = [];
  dividendYearOptions: Array<{ id: string; year: string; dividend_type_name: string; totalDividend: string }> = [];
  userId: string;
  groupId: string;
  isLoading = true;
  totalAmount: string;
  display1: string = 'none';
  display2: string = 'none';
  dividendId: any;
  selectedDividendYear = '';
  selectedDividend: { id: string; year: string; totalDividend: string } | null = null;
  isPayoutLoading = false;
  selectedSafeDividendYear = '';
  selectedSafeDividend: { id: string; year: string; dividend_type_name: string; totalDividend: string } | null = null;
  isSafekeepingLoading = false;

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
      this.lists = response.lists || [];

      // this.years = response.years || [];

      this.dividendYearOptions = this.lists
        .filter((item: any) => String(item?.status) !== '1')
        .map((item: any) => ({
          id: String(item?.id || ''),
          year: String(item?.dividend_year || ''),
          dividend_type_name: String(item?.dividend_type_name || ''),
          totalDividend: String(item?.total_dividend || '0.00')
        }));
      console.log(this.dividendYearOptions);
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

  showSafekeepingModal() {
    this.display2 = "block";
    this.selectedSafeDividendYear = '';
    this.selectedSafeDividend = null;
    this.dividendId = '';
  }

  onClose() {
    this.display1 = "none";
    this.display2 = "none";
  }

  onDividendYearChange(): void {
    this.selectedDividend = this.dividendYearOptions.find(
      (item) => item.id == this.selectedDividendYear
    ) || null;
    this.dividendId = this.selectedDividend?.id || '';
    console.log(this.selectedDividend);
  }

  onSafeDividendYearChange(): void {
    this.selectedSafeDividend = this.dividendYearOptions.find(
      (item) => item.id == this.selectedSafeDividendYear
    ) || null;
    this.dividendId = this.selectedSafeDividend?.id || '';
  }

  onPayout() {
    if (!this.selectedDividend) {
      this.toastr.error('Please select a dividend year.');
      return;
    }

    this.isPayoutLoading = true;

    this.userService.addPayoutDividend(this.userId, this.selectedDividend.id)
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

  onSafekeepingRequest() {
    if (!this.selectedSafeDividend) {
      this.toastr.error('Please select a dividend year.');
      return;
    }

    this.isSafekeepingLoading = true;

    this.userService.addDividendSafekeeping(this.userId, this.selectedSafeDividend.id)
      .pipe(finalize(() => {
        this.isSafekeepingLoading = false;
      }))
      .subscribe((response: any) => {
        if (response.success === '1') {
          this.toastr.success(response.message);
          document.getElementById('closesafekeeping')?.click();
        } else {
          this.toastr.error(response.message);
        }
        this.ngOnInit();
      });
  }

}
