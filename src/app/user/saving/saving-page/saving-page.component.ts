import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { GroupCycle } from '../../../model/groupCycle.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userCycle } from 'src/app/model/userCycle.model';
import { SavingService } from 'src/app/service/saving.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-saving-page',
  templateUrl: './saving-page.component.html',
  styleUrls: ['./saving-page.component.css']
})
export class SavingPageComponent implements OnInit {
  @Output() lifecycleUpdateId = new EventEmitter();
  lists: userCycle[] = [];
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
  lifeCycleStartDatePF: string;
  lifeCycleEndDatePF: string;
  filterIdPF: string;
  callFromPF: string;






  constructor(
    public userService: UserService,
    public savingService: SavingService,
    public authService: AuthService,
    private toastr: ToastrService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.groupId = this.authService.getgroupId();
    this.userId = this.authService.getUserId();
    this.callFromPF = localStorage.getItem('fromPF_interFriendWeb');
    if (this.callFromPF != '0') {
      this.lifeCycleStartDatePF = localStorage.getItem('lifeCycleStart_interFriendWeb');
      this.lifeCycleEndDatePF = localStorage.getItem('lifeCycleEnd_interFriendWeb');
      this.filterIdPF = localStorage.getItem('lifeCycleID_interFriendWeb');
      this.setCycle(this.filterIdPF, this.lifeCycleStartDatePF, this.lifeCycleEndDatePF);
      this.reinitializeData();
    }
    else {
      this.savingService.groupCycleAll_list(
        this.groupId,
        localStorage.getItem('lifeCycleType_interFriendWeb')
      ).subscribe((response: any) => {
        this.cycleList = response.lists;
        if (this.cycleList.length > 0) {
          console.log('saving page starttttttt', this.cycleList);
          this.filterStartDate = this.cycleList[0].start_date;
          this.filterEndDate = this.cycleList[0].end_date;
          //debugger
          this.groupLifecycle_id = this.cycleList[0].id;
          this.loadData();
          this.loadPayoutAmount(this.groupLifecycle_id);

        } else {
          this.isLoading = false;
          this.isLoadingChangeCycle = false;
          this.lifecycleUpdateId.emit(this.groupLifecycle_id);
        }
      });
    }
  }

  loadData() {
    this.savingService.userSingleCycle(this.groupId, this.groupLifecycle_id, this.userId).subscribe((response: any) => {
      this.lists = response.groupCycleList;
      this.isLoading = false;
      this.isLoadingChangeCycle = false;
      this.lifecycleUpdateId.emit(this.groupLifecycle_id);
    });

  }



  setCycle(cycleId: string, startDate: string, endDate: string) {
    this.groupLifecycle_id = cycleId;
    this.filterStartDate = startDate;
    this.filterEndDate = endDate;
    this.isLoadingChangeCycle = true;
    this.lifecycleUpdateId.emit(this.groupLifecycle_id);
    this.loadData();
    this.loadPayoutAmount(this.groupLifecycle_id);
  }

  reinitializeData() {
    localStorage.setItem('lifeCycleStart_interFriendWeb', '0');
    localStorage.setItem('lifeCycleEnd_interFriendWeb', '0');
    localStorage.setItem('filterID_interFriendWeb', '0');
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
    this.userService.addPayout(this.userId, this.groupLifecycle_id, this.groupId, this.pfNote)
      .subscribe((response: any) => {
        if (response.success === '1') {
          this.toastr.success(response.message);
          this.pfNote = '';
        } else {
          this.toastr.error(response.message);
        }

        document.getElementById('closepayout').click();
        this.ngOnInit();
      })
  }


  onSafekeeping() {
    this.userService.addSafeKeeping(this.userId, this.groupLifecycle_id, this.groupId, this.sfNote)
      .subscribe((response: any) => {
        if (response.success === '1') {
          this.toastr.success(response.message);
          this.sfNote = '';
        } else {
          this.toastr.error(response.message);
        }

        document.getElementById('closesafekeeping').click();
        this.ngOnInit();
      })
  }


}
