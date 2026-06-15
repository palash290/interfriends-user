import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Inject,
} from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { UserList } from 'src/app/model/userList.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { bannersAndmessagesService } from 'src/app/service/bannersAndmessages.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
declare var $: any;
export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  image?: string;
  url?: string;
  thumbnailUrl?: string;
}

interface Document extends HTMLDocument {
  mozCancelFullScreen: () => void;
  webkitExitFullscreen: () => void;
  mozFullScreenElement: () => void;
  webkitFullscreenElement: () => void;
}

interface DashboardCarousel {
  startPausing(): void;
  startPlayML(): void;
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
  avgAmountCycle: any;
  avgAmountCycleJNR: any;
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
  savingData: any;
  savingJnrData: any;
  avgSafeKeepingData: any;
  avgPfData: any;
  avgInvestingData: any;
  avgDividentData: any;
  avgHelptoBuyData: any;
  avgLoanData: any;
  avgEmergencyLoanData: any;
  avgMiscelinaousData: any;
  avgWelfareData: any;

  showHiddenFields: boolean = false;

  apiData: PhotosApi;
  limit: number = 10; // <==== Edit this number to limit API results
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    center: true,
    dots: false,
    nav: true,
    navText: [
      '<span class="dashboard-carousel-nav dashboard-carousel-nav--prev"><i class="fa fa-arrow-left" aria-hidden="true"></i></span>',
      '<span class="dashboard-carousel-nav dashboard-carousel-nav--next"><i class="fa fa-arrow-right" aria-hidden="true"></i></span>'
    ],
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

  isVideoMedia(mediaUrl: string): boolean {
    return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(mediaUrl);
  }

  getVideoType(mediaUrl: string): string {
    const extension = mediaUrl.split('?')[0].split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'webm':
        return 'video/webm';
      case 'ogg':
        return 'video/ogg';
      case 'mov':
        return 'video/quicktime';
      default:
        return 'video/mp4';
    }
  }

  pauseCarousel(carousel: DashboardCarousel): void {
    carousel.startPausing();
  }

  playCarousel(carousel: DashboardCarousel): void {
    carousel.startPlayML();
  }

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private getbanners: bannersAndmessagesService,
    private route: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.fetchBanners();
    this.userId = this.authService.getUserId();
    this.usersSub = this.userService.getLast5trancstionUserInfo(this.userId).subscribe(
      (userData: { users: UserList[]; userCount: number, userList: [], Avg_circle_score: string }) => {
        this.averageTrustScore = userData.Avg_circle_score;
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
          .subscribe({
            next: (response: any) => {
              this.avgAmountCycle = response.avgAmountCycle;
              this.savingData = response.lastSixTransactions;
              this.overAllTotal += parseInt(this.avgAmountCycle);
              this.isLoadingSaving = false;
            },
            error: (error: any) => {
              console.error('Error fetching savings:', error);
              this.avgAmountCycle = 0;
              this.isLoadingSaving = false;
            }
          });

        this.userService
          .avgSavingJNR(this.groupId, this.userId)
          .subscribe({
            next: (response: any) => {
              this.avgAmountCycleJNR = response.avgAmountCycle;
              this.savingJnrData = response.lastSixTransactions;
              this.overAllTotal += parseInt(this.avgAmountCycleJNR);
              this.isLoadingSavingJNR = false;
            },
            error: (error: any) => {
              console.error('Error fetching JNR savings:', error);
              this.avgAmountCycleJNR = 0;
              this.isLoadingSavingJNR = false;
            }
          });


        this.userService
          .avgSafeKeeping(this.groupId, this.userId)
          .subscribe((response: any) => {

            this.avgSafeKeepingData = response.lastSixTransactions;
          });

        this.userService
          .avgPf(this.groupId, this.userId)
          .subscribe((response: any) => {
            this.avgPfData = response.lastSixTransactions;
          });

        this.userService
          .avgInvesting(this.groupId, this.userId)
          .subscribe((response: any) => {
            this.avgInvestingData = response.lastSixTransactions;
          });

        this.userService
          .avgDivident(this.groupId, this.userId)
          .subscribe((response: any) => {
            this.avgDividentData = response.lastSixTransactions;
          });

        this.userService
          .avgSavingHelpToBuy(this.groupId, this.userId)
          .subscribe((response: any) => {
            this.avgAmountHelpToBuy = response.avgAmountCycle;
            this.avgHelptoBuyData = response.lastSixTransactions;
            this.overAllTotal =
              this.overAllTotal + parseInt(this.avgAmountHelpToBuy);
            this.isLoadingSavingHelpToBuy = false;
          });

        this.userService
          .avgLoan(this.groupId, this.userId)
          .subscribe((response: any) => {
            this.avgLoanData = response.lastSixTransactions;
          });

        this.userService
          .avgEmergencyLoan(this.groupId, this.userId)
          .subscribe((response: any) => {
            this.avgEmergencyLoanData = response.lastSixTransactions;
          });

        this.userService
          .avgWelfare(this.groupId, this.userId)
          .subscribe((response: any) => {
            this.avgWelfareData = response.lastSixTransactions;
          });

        this.userService
          .avgMiscelinaous(this.groupId, this.userId)
          .subscribe((response: any) => {
            this.avgMiscelinaousData = response.lastSixTransactions;
          });

      });

    this.userService.getUserInfo(this.userId).subscribe((response: any) => {
      this.userDetail = response.userinfo;
      //console.log(this.userDetail, 'userDetail');
      this.isLoadingUser = false;
    });

    this.userService.getCreditScoreForDasboard().subscribe((response: any) => {
      if (response.success == '1') {
        //console.log('credit color', response);
        this.creditScoreAll = response.credit_score_list;
      } else {
      }
    });


    this.userService.getNotificationCount1().subscribe((response: any) => {
      //this.isProperty = response?.isProperty;
      if (response?.is_investment_arrived == '1') {
        $('#new').modal('show');
      }
    });
  }

  closeModal() {
    $('#new').modal('hide');
  }

  GoInvestment() {
    $('#new').modal('hide');
    this.route.navigateByUrl('/user/notificationList')
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
    this.videoElement = this.video.nativeElement;
    this.videoContainer.nativeElement.addEventListener('mousemove', () => {
      this.displayControls();
    });
    this.document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        this.isFullScreen = false;
      } else {
        this.isFullScreen = true;
      }
    });

    this.document.addEventListener('keyup', (event) => {
      if (event.code === 'Space') {
        this.playPause();
      }
      if (event.code === 'KeyM') {
        this.toggleMute();
      }
      if (event.code === 'KeyF') {
        this.toggleFullScreen();
      }
      this.displayControls();
    });

    this.videoElement.addEventListener('timeupdate', () => {
      this.watchedProgress =
        (this.videoElement.currentTime / this.videoElement.duration) * 100;

      const totalSecondsRemaining =
        this.videoElement.duration - this.videoElement.currentTime;
      const time = new Date();
      time.setSeconds(totalSecondsRemaining);
      let hours = null;

      if (totalSecondsRemaining >= 3600) {
        hours = time.getHours().toString().padStart(2, '0');
      }

      let minutes = time.getMinutes().toString().padStart(2, '0');
      let seconds = time.getSeconds().toString().padStart(2, '0');

      this.durationRemaining = `${hours ? hours + ':' : ''
        }${minutes}:${seconds}`;
    });

    this.progressBar.nativeElement.addEventListener('click', (event: { pageX: number; }) => {
      const progressBarEle = this.progressBar.nativeElement as HTMLElement;
      const pos =
        (event.pageX -
          (progressBarEle.offsetLeft + progressBarEle.offsetLeft)) /
        progressBarEle.offsetWidth;
      this.videoElement.currentTime = pos * this.videoElement.duration;
    });

    this.videoElement.addEventListener('progress', () => {
      var range = 0;
      var bf = this.videoElement.buffered;
      var time = this.videoElement.currentTime;
      while (!(bf.start(range) <= time && time <= bf.end(range))) {
        range += 1;
      }
      var loadStartPercentage = bf.start(range) / this.videoElement.duration;
      var loadEndPercentage = bf.end(range) / this.videoElement.duration;
      this.loadPercentage = loadEndPercentage * 100;
    });

    this.videoElement.addEventListener('waiting', (data) => {
      this.isLoadingContent = true;
      this.isPlaying = false;
    });
    this.videoElement.addEventListener('playing', (data) => {
      this.isLoadingContent = false;
      this.isPlaying = true;
    });

    this.videoElement.addEventListener('ended', (data) => {
      this.isPlaying = false;
    });
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

  toggleShow() {
    this.showHiddenFields = !this.showHiddenFields;
  }

  getTrustScoreColor(score: number): string {
    if (score >= 0 && score <= 650) return 'red';
    if (score >= 651 && score <= 700) return '#F86624';
    if (score >= 701 && score <= 800) return '#666666';
    if (score >= 801 && score <= 850) return '#B28D00';
    if (score >= 851 && score <= 1200) return '#048227';
    if (score >= 1201 && score <= 1300) return '#0460c5';
    if (score >= 1601 && score <= 1650) return 'black';
    return 'transparent'; // default
  }






































  public displayControllsOpacity = 0;
  public isPlaying = false;
  public isFullVolume = true;
  public isFullScreen = false;
  public watchedProgress = 0;
  public loadPercentage = 0;
  public isLoadingContent = false;
  public durationRemaining = '00:00';
  public controlsTimeout!: any;

  @ViewChild('video') video!: ElementRef;
  @ViewChild('videoContainer') videoContainer!: ElementRef;
  @ViewChild('progressBar') progressBar!: ElementRef;
  public videoElement!: HTMLVideoElement;
  @Input() videoUrl: string = '';
  // constructor() { }




  displayControls() {
    this.displayControllsOpacity = 1;
    document.body.style.cursor = 'initial';
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    }
    this.controlsTimeout = setTimeout(() => {
      if (this.isPlaying) {
        this.displayControllsOpacity = 0;
      } else {
        this.displayControllsOpacity = 1;
      }
      document.body.style.cursor = 'none';
    }, 5000);
  }

  playPause() {
    if (this.videoElement.paused) {
      this.videoElement.play();
      this.isPlaying = true;
    } else {
      this.videoElement.pause();
      this.isPlaying = false;
    }
  }

  toggleMute() {
    this.videoElement.muted = !this.videoElement.muted;
    if (this.videoElement.muted) {
      this.isFullVolume = false;
    } else {
      this.isFullVolume = true;
    }
  }

  toggleFullScreen() {
    if (
      !document.fullscreenElement &&
      !(document as Document).webkitFullscreenElement
    ) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
  }

  openFullscreen() {
    if (this.videoContainer.nativeElement.requestFullscreen) {
      this.videoContainer.nativeElement.requestFullscreen();
    } else if (this.videoContainer.nativeElement.webkitRequestFullscreen) {
      /* Safari */
      this.videoContainer.nativeElement.webkitRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if ((document as Document).exitFullscreen) {
      (document as Document).exitFullscreen();
    } else if ((document as Document).webkitExitFullscreen) {
      /* Safari */
      (document as Document).webkitExitFullscreen();
    }
  }

  addTime(seconds: number = 10) {
    this.videoElement.currentTime += seconds;
  }


}
