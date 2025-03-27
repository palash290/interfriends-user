import { Component, OnInit } from '@angular/core';
import { Pf } from 'src/app/model/pf.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import {Location} from '@angular/common';
import { GroupCycle } from '../../model/groupCycle.model';
import {Router} from '@angular/router';
@Component({
  selector: 'app-pf-list',
  templateUrl: './pf-list.component.html',
  styleUrls: ['./pf-list.component.css']
})
export class PfListComponent implements OnInit {
  pfList: Pf[]= [];
  pfListFiltered : Pf[] = [];
  pfAmount: string;
  pfInterest: string;
  isLoading = true;
  groupId: string;
  userId: string;
  main_Id: string;
  cycleList: GroupCycle[] = [];
  filterStartDate: string;
  filterEndDate: string;
  isLoadingD = true;
  groupTypeArray : string [] = ["", "Saving", "Saving JNR", "Help to Buy", "Welfare" ]
  /*isLoadingChangeCycle = false;*/


  constructor(
    public userService: UserService,
    public authService: AuthService,
    private _location: Location,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.groupId = this.authService.getgroupId();
    this.userId = this.authService.getUserId();
    this.isLoading = true;
    this.userService.pfList(this.groupId, this.userId).subscribe((response: any) => {
      this.pfList = response.pfList;
      this.pfListFiltered = this.pfList.filter(pfList => pfList.cycle_start_date != "" && pfList.cycle_end_date != "")
      console.log(this.pfList, 'pfList');
      this.pfAmount = response.pfAmount;
      this.pfInterest = response.pf_interest;
      this.isLoading = false;

      if(this.pfList.length > 0) {
        this.filterStartDate = this.pfList[0].cycle_start_date;
        this.filterEndDate = this.pfList[0].cycle_end_date;
        this.main_Id = this.pfList[0].id;
      }
      else {
        this.isLoadingD = false;
        /*this.isLoadingChangeCycle = false;*/
     }
    });
  }

  backClicked() {
    this._location.back();
  }

  loadData() {
    this.userService.pfListFilter(this.groupId, this.userId, this.main_Id).subscribe((response: any) => {
      this.pfList = response.pfList;
      this.filterStartDate = this.pfList[0].cycle_start_date;
      this.filterEndDate = this.pfList[0].cycle_end_date;
      this.main_Id = this.pfList[0].id;
      /*this.isLoadingD = false;
      this.isLoadingChangeCycle = false;*/
    });
  }


  setCycle(mainId: string, startDate: string, endDate: string) {
    this.main_Id = mainId;
    this.filterStartDate = startDate;
    this.filterEndDate = endDate;
    /*this.isLoadingChangeCycle = true;*/
    this.loadData();
  }

  linktoSavePage(filterStartDate : string ,filterEndDate : string, groupLifeCycleID : string)
  {
    localStorage.setItem('lifeCycleStart_interFriendWeb',filterStartDate);
    localStorage.setItem('lifeCycleEnd_interFriendWeb', filterEndDate);
    localStorage.setItem('lifeCycleID_interFriendWeb', groupLifeCycleID);
    this.router.navigate(['/user/PFsavingDetails', '1']);

  }

}
