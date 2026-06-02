import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { GroupCycle } from '../../../model/groupCycle.model';
import { ActivatedRoute } from '@angular/router';
import { SavingService } from 'src/app/service/saving.service';
import { Payout } from 'src/app/model/payout.model';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-payout-page',
  templateUrl: './payout-page.component.html',
  styleUrls: ['./payout-page.component.css']
})
export class PayoutPageComponent implements OnInit {
  @Output() lifecycleUpdateId = new EventEmitter();
  lists: Payout[] = [];
  isLoading = true;
  selectListStatusId: string;
  selectListId: string;
  groupId: string;
  userId: string;
  groupLifecycle_id: string;
  cycleList: GroupCycle[] = [];
  filterStartDate: string;
  filterEndDate: string;
  isLoadingChangeCycle = false;

  constructor(
    public userService: UserService,
    public savingService: SavingService,
    public authService: AuthService,
    public route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.groupId = this.authService.getgroupId();
    this.userId = this.authService.getUserId();
    this.savingService.groupCycleAll_list(
      this.groupId,
      localStorage.getItem('lifeCycleType_interFriendWeb')
    ).subscribe((response: any) => {
      this.cycleList = response.lists;

      console.log(this.cycleList, 'this.cycleLists');
      if (this.cycleList.length > 0) {
        this.filterStartDate = this.cycleList[0].start_date;
        this.filterEndDate = this.cycleList[0].end_date;
        this.groupLifecycle_id = this.cycleList[0].id;
      }
      this.loadData();
      this.loadDataSafekeeping();
      this.loadPayoutAmount(this.groupLifecycle_id);
    });
  }

  loadData() {
    this.savingService.payoutDetail(this.groupId, this.groupLifecycle_id, this.userId).subscribe((response: any) => {
      //debugger
      this.lists = response.payoutCycle;
      this.isLoading = false;
      this.isLoadingChangeCycle = false;
      this.lifecycleUpdateId.emit(this.groupLifecycle_id);
    });
  }

  safekeepingCycleList: any;
  safeReqBy: any;
  safeStatus: any;

  loadDataSafekeeping() {
    this.savingService.safekeepingDetail(this.groupId, this.groupLifecycle_id, this.userId).subscribe((response: any) => {
      //debugger
      this.safekeepingCycleList = response.safekeepingCycle;
      this.safeReqBy = response.safekeepingCycle[0]?.requested_by;
      this.safeStatus = response.safekeepingCycle[0].request_status;
      this.isLoading = false;
      this.isLoadingChangeCycle = false;
      //this.lifecycleUpdateId.emit(this.groupLifecycle_id);
    });
  }




  setCycle(cycleId: string, startDate: string, endDate: string) {
    this.groupLifecycle_id = cycleId;
    this.filterStartDate = startDate;
    this.filterEndDate = endDate;
    this.isLoadingChangeCycle = true;
    this.lifecycleUpdateId.emit(this.groupLifecycle_id);
    this.loadData();
    this.loadDataSafekeeping();
    this.loadPayoutAmount(this.groupLifecycle_id);
  }





  display1: string = 'none';
  display2: string = 'none';
  totalInfo: any;
  pfNote: any;
  sfNote: any;

  showModal() {
    this.display2 = "block";
  }

  showPayoutModal() {
    this.display1 = "block";
  }

  loadPayoutAmount(groupLifecycle_id: any) {
    //this.isLoadingTotal = true;
    // debugger
    this.userService.getCycleTotalAmount(this.userId, groupLifecycle_id, this.groupId)
      .subscribe((response: any) => {
        this.totalInfo = response.info;
        //this.isLoadingTotal = false;
      });
  }

  onClose() {
    this.display1 = "none";
    this.display2 = "none";
  }

  onPayout() {
    if (this.totalInfo?.amount > 0) {
      this.userService.addPayout(this.userId, this.groupLifecycle_id, this.groupId, this.pfNote)
        .subscribe((response: any) => {
          if (response.success === '1') {
            this.toastr.success(response.message);
            this.pfNote = '';
            this.display2 = "block";
          } else {
            this.toastr.error(response.message);
          }
          document.getElementById('closepayout').click();
          this.ngOnInit();
        })
      // this.toastr.warning('SUCCESS!')
    } else {
      this.toastr.warning('You dont have enough balance!')
    }

  }


  onSafekeeping() {
    if (this.totalInfo?.amount > 0) {
      this.userService.addSafeKeeping(this.userId, this.groupLifecycle_id, this.groupId, this.sfNote)
        .subscribe((response: any) => {
          if (response.success === '1') {
            this.toastr.success(response.message);
            this.sfNote = '';
            this.onClose();
          } else {
            this.toastr.error(response.message);
          }

          document.getElementById('closesafekeeping').click();
          this.ngOnInit();
        })
    } else {
      this.toastr.warning('You dont have enough balance!')
    }

  }


}
