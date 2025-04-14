import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user.model';
import { UserList } from 'src/app/model/userList.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpClient } from '@angular/common/http';
import { Subscription, throwError } from 'rxjs';
import { bannersAndmessagesService } from 'src/app/service/bannersAndmessages.service';
export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('selectElem') el: ElementRef;
  userDetail: UserList;
  name: string;
  userId: string;
  private usersSub: Subscription;
  groupId: string;
  isLoading = true;
  isLoadingSaving = true;
  isLoadingSavingJNR = true;
  isLoadingSavingHelpToBuy = true;
  isLoadingUser = true;
  transactionData: any[] = []

  creditScoreAll: any[] = [];

  avgAmountEmergencyLoan: string;
  averageTrustScore: string;
  avgAmountMiscellaneous: string;
  totalAmountInvestment: string;
  avgAmountSafeKeeping: string;
  avgAmountCycle: string;
  avgAmountCycleJNR: string;
  avgAmountHelpToBuy: string;
  avgAmountLoan: string;
  avgAmountPf: string;
  totalAmountDivided: string;
  avgwelfare: string;
  total_credit_score = 0;
  creditScoreColor = '';
  creditScoreTxt = '';
  overAllTotal: number = 0;
  optionsB = {
    percent: 60,
    maxPercent: 1000,
    toFixed: 0,
    showTitle: true,
    showUnits: true,
    showSubtitle: true,
    showImage: false,
    showBackground: true,
    showInnerStroke: true,
    clockwise: true,
    responsive: true,
    startFromZero: true,
    showZeroOuterStroke: true,
    radius: 173,
    backgroundPadding: 1,
    imageHeight: 87,
    imageWidth: 99,
    backgroundGradient: false,
    backgroundOpacity: 1,
    backgroundColor: 'transparent',
    backgroundGradientStopColor: 'transparent',
    // backgroundGradientStopColor:"transparent",
    backgroundStroke: 'transparent',
    outerStrokeGradient: false,
    outerStrokeColor: '#f2994a',
    outerStrokeGradientStopColor: 'transparent',
    innerStrokeColor: '#c76d1a',
    // innerStrokeColor:"#c76d1a",
    unitsColor: '#444444',
    subtitleColor: '#A9A9A9',
    outerStrokeWidth: 36,
    space: 4,
    innerStrokeWidth: 4,
    backgroundStrokeWidth: 0,
    outerStrokeLinecap: 'square',
    animation: true,
    animateTitle: true,
  };

  apiData: PhotosApi;
  limit: number = 10; // <==== Edit this number to limit API results
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  constructor(
    private readonly http: HttpClient,
    public authService: AuthService,
    public userService: UserService,
    private toastr: ToastrService,
    private getbanners: bannersAndmessagesService
  ) { }

  ngOnInit(): void {
    this.fetchBanners();
    this.userId = this.authService.getUserId();
    this.usersSub = this.userService.getLast5trancstionUserInfo(this.userId).subscribe(
      (userData: { users: UserList[]; userCount: number, userList: [], Avg_circle_score: string }) => {
        this.averageTrustScore = userData.Avg_circle_score;
        console.log(userData, "userData===========>")
        this.transactionData = userData.userList;
        // this.users = userData.users;
        // this.totalUsers =  userData.userCount;
        // this.isLoading = false;
        // this.isLoadingPage = false;
      });
    this.groupId = this.authService.getgroupId();
    this.name = this.authService.getName();

    this.userService
      .avgAmount(this.groupId, this.userId)
      .subscribe((response: any) => {

        this.avgAmountSafeKeeping = response.avgAmountSafeKeeping;
        this.avgAmountCycle = response.avgAmountCycle;
        this.avgAmountLoan = response.avgAmountLoan;
        this.avgAmountPf = response.avgAmountPf;
        this.avgAmountEmergencyLoan = response.avgAmountEmergencyLoan;
        this.totalAmountInvestment = response.totalAmountInvestment;
        this.totalAmountDivided = response.totalAmountDivided;
        this.avgAmountMiscellaneous = response.avgAmountMiscellaneous;
        this.avgwelfare = response.avgwelfare;
        this.total_credit_score = parseInt(response.total_credit_score);
        // this.total_credit_score = 1300

        this.overAllTotal =
          this.overAllTotal +
          parseInt(this.avgAmountSafeKeeping) +
          parseInt(this.avgAmountLoan) +
          parseInt(this.avgAmountPf) +
          parseInt(this.avgAmountEmergencyLoan) +
          parseInt(this.totalAmountInvestment) +
          parseInt(this.totalAmountDivided) +
          parseInt(this.avgAmountMiscellaneous) +
          parseInt(this.avgwelfare)


        this.isLoading = false;
        if (this.total_credit_score >= 0 && this.total_credit_score <= 650) {
          document.documentElement.style.setProperty(
            '--theme-color-1',
            '#E20000'
          );
          this.creditScoreColor = '#E20000';
          this.creditScoreTxt = 'Caution - (No Rating)';
        } else if (
          this.total_credit_score >= 651 &&
          this.total_credit_score <= 700
        ) {
          document.documentElement.style.setProperty(
            '--theme-color-1',
            '#F86624'
          );
          this.creditScoreColor = '#F86624';
          this.creditScoreTxt = 'Poor - (Bronze Member)';
        } else if (
          this.total_credit_score >= 701 &&
          this.total_credit_score <= 800
        ) {
          document.documentElement.style.setProperty(
            '--theme-color-1',
            '#666666'
          );
          this.creditScoreColor = '#666666';
          this.creditScoreTxt = 'Fair - (Silver Member)';
        } else if (
          this.total_credit_score >= 801 &&
          this.total_credit_score <= 850
        ) {
          document.documentElement.style.setProperty(
            '--theme-color-1',
            '#B28D00'
          );
          this.creditScoreColor = '#B28D00';
          this.creditScoreTxt = 'Good - (Gold Member)';
        } else if (
          this.total_credit_score >= 851 &&
          this.total_credit_score <= 1200
        ) {
          document.documentElement.style.setProperty(
            '--theme-color-1',
            '#048227'
          );
          this.creditScoreColor = '#048227';
          this.creditScoreTxt = 'Excellent - (Platinum Member)';
        } else if (
          this.total_credit_score >= 1201 &&
          this.total_credit_score <= 1300
        ) {
          document.documentElement.style.setProperty(
            '--theme-color-1',
            '#0460c5'
          );
          this.creditScoreColor = '#0460c5';
          this.creditScoreTxt = 'Exemplary - (Diamond Member)';
        }
        else if (
          this.total_credit_score >= 1601 &&
          this.total_credit_score <= 1650
        ) {
          document.documentElement.style.setProperty(
            '--theme-color-1',
            '#c745f3'
          );
          this.creditScoreColor = '#c745f3';
          this.creditScoreTxt = 'Very Important person - (Rhodium Member)';
        } else {
          document.documentElement.style.setProperty(
            '--theme-color-1',
            '#0460c5'
          );
          this.creditScoreColor = '#0460c5';
          this.creditScoreTxt = 'Exemplary - (Diamond Member)';
        }
        this.userService
          .avgSaving(this.groupId, this.userId)
          .subscribe((response: any) => {
            this.avgAmountCycle = response.avgAmountCycle;
            this.overAllTotal =
              this.overAllTotal + parseInt(this.avgAmountCycle);
            this.isLoadingSaving = false;
          });
        this.userService
          .avgSavingJNR(this.groupId, this.userId)
          .subscribe((response: any) => {
            this.avgAmountCycleJNR = response.avgAmountCycle;
            this.overAllTotal =
              this.overAllTotal + parseInt(this.avgAmountCycleJNR);
            this.isLoadingSavingJNR = false;
          });

        this.userService
          .avgSavingHelpToBuy(this.groupId, this.userId)
          .subscribe((response: any) => {
            this.avgAmountHelpToBuy = response.avgAmountCycle;
            this.overAllTotal =
              this.overAllTotal + parseInt(this.avgAmountHelpToBuy);
            this.isLoadingSavingHelpToBuy = false;
          });
      });

    this.userService.getUserInfo(this.userId).subscribe((response: any) => {
      this.userDetail = response.userinfo;
      console.log(this.userDetail, 'userDetail');
      this.isLoadingUser = false;
    });

    this.userService.getCreditScoreForDasboard().subscribe((response: any) => {
      if (response.success == '1') {
        console.log('credit color', response);
        this.creditScoreAll = response.credit_score_list;
      } else {
      }
    });
  }
  fetchBanners() {
    this.getbanners.GetbannersAndmessages().subscribe((response: any) => {
      this.apiData = response.banners;
    });
    // const api = `https://jsonplaceholder.typicode.com/albums/1/photos?_start=0&_limit=${this.limit}`;
    // const http$ = this.http.get<PhotosApi>(api);

    // http$.subscribe(
    //   res => this.apiData = res,
    //   err => throwError(err)
    // )
  }

  ngAfterViewInit() {
    //   Score Meter JS
    // $(this.el.nativeElement).(".GaugeMeter").gaugeMeter();
  }

  getClassOf(val: string) {
    if (val == 'Caution') {
      return 'color-red';
    } else if (val == 'Poor') {
      return 'color-orange';
    } else if (val == 'Fair') {
      return 'color-grey';
    } else if (val == 'Good') {
      return 'color-gold';
    } else if (val == 'Excellent') {
      return 'color-green';
    } else if (val == 'Exemplary') {
      return 'color-blue';
    }
    else if (val == 'Very Important person') {
      return 'color-rhodium';
    } else {
      return false
    }
  };


}
