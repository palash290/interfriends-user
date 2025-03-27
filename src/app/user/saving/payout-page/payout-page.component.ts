import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {UserService} from '../../../service/user.service';
import { GroupCycle } from '../../../model/groupCycle.model';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userCycle } from 'src/app/model/userCycle.model';
import { SavingService } from 'src/app/service/saving.service';
import { Payout } from 'src/app/model/payout.model';
import { AuthService } from 'src/app/service/auth.service';


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
    private toastr: ToastrService,
    public authService: AuthService,
    public route: ActivatedRoute
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
      if(this.cycleList.length > 0) {
        this.filterStartDate = this.cycleList[0].start_date;
        this.filterEndDate = this.cycleList[0].end_date;
        this.groupLifecycle_id = this.cycleList[0].id;
      }
      this.loadData();
    });
}

loadData() {
  this.savingService.payoutDetail(this.groupId, this.groupLifecycle_id, this.userId).subscribe((response: any) => {
    this.lists = response.payoutCycle;
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
}

}
