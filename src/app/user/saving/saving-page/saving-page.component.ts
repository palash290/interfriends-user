import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {UserService} from '../../../service/user.service';
import { GroupCycle } from '../../../model/groupCycle.model';
import { ActivatedRoute, ParamMap} from '@angular/router';
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
  lifeCycleStartDatePF : string;
  lifeCycleEndDatePF : string;
  filterIdPF : string;
  callFromPF : string;






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
      if (this.callFromPF != '0')
      {
         this.lifeCycleStartDatePF =  localStorage.getItem('lifeCycleStart_interFriendWeb');
         this.lifeCycleEndDatePF = localStorage.getItem('lifeCycleEnd_interFriendWeb');
         this.filterIdPF = localStorage.getItem('lifeCycleID_interFriendWeb');
         this.setCycle(this.filterIdPF,this.lifeCycleStartDatePF,this.lifeCycleEndDatePF );
         this.reinitializeData();
      }
      else
      {
         this.savingService.groupCycleAll_list(
           this.groupId,
           localStorage.getItem('lifeCycleType_interFriendWeb')
           ).subscribe((response: any) => {
           this.cycleList = response.lists;
           if(this.cycleList.length > 0) {
                console.log('saving page starttttttt', this.cycleList);
                this.filterStartDate = this.cycleList[0].start_date;
                this.filterEndDate = this.cycleList[0].end_date;
                this.groupLifecycle_id = this.cycleList[0].id;
                this.loadData();
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
  }

  reinitializeData()
  {
    localStorage.setItem('lifeCycleStart_interFriendWeb','0');
    localStorage.setItem('lifeCycleEnd_interFriendWeb', '0');
    localStorage.setItem('filterID_interFriendWeb', '0');
  }


}
