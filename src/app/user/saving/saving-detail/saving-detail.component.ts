import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { SavingService } from 'src/app/service/saving.service';
import { ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-saving-detail',
  templateUrl: './saving-detail.component.html',
  styleUrls: ['./saving-detail.component.css']
})
export class SavingDetailComponent implements OnInit {
  groupId: string;
  userId: string;
  groupLifeCycleId: string;
  avgAmount = '0';
  totalAvgAmount = '0';
  isLoading = true;
  status = '1';
  form: FormGroup;
  // isLoading = false;
  // userId: string;
  // groupId: string;

  constructor(
    public savingService: SavingService,
    public userService: UserService,
    public authService: AuthService,
    private _location: Location,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      amount: new FormControl(null, { validators: [Validators.required] }),
      date	: new FormControl(null, { validators: [Validators.required] }),
      reason	: new FormControl(null, { validators: [Validators.required] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.get('lifeCycleType')) {
        localStorage.setItem('lifeCycleType_interFriendWeb', paramMap.get('lifeCycleType'));
      } else {
        localStorage.setItem('lifeCycleType_interFriendWeb', '1');
      }

      if(paramMap.get('fromPF')) {
        localStorage.setItem('fromPF_interFriendWeb', paramMap.get('fromPF'));
      } else {
        localStorage.setItem('fromPF_interFriendWeb', '0');
      }

      console.log('lifeCycleType_interFriendWeb');
      this.groupId = this.authService.getgroupId();
      this.userId = this.authService.getUserId();
    });
  }

  backClicked() {
    this._location.back();
  }


  cycleAvg(lifecycleUpdateId: string): void {
    console.log(lifecycleUpdateId, 'this.groupLifeCycleId');
    if(lifecycleUpdateId !== undefined) {
      console.log('cycle avg');
      this.isLoading = true;
      this.groupLifeCycleId = lifecycleUpdateId;
      this.savingService.cylcleAvg(this.groupId, this.userId, lifecycleUpdateId, localStorage.getItem('lifeCycleType_interFriendWeb')).subscribe((response: any) => {
        this.avgAmount = response.avgAmount;
        this.totalAvgAmount =  response.totalAvgAmount;
        this.isLoading = false;
      });
    } else {
      this.avgAmount = '0';
      this.totalAvgAmount =  '0';
      this.isLoading = false;
    }
  }


  payoutAvg(lifecycleUpdateId: string): void {
    this.isLoading = true;
    this.groupLifeCycleId = lifecycleUpdateId;
    this.savingService.cylcleAvgPayout(this.groupId, this.userId, lifecycleUpdateId).subscribe((response: any) => {
      this.avgAmount = response.avgAmount;
      this.totalAvgAmount =  response.totalAvgAmount;
      this.isLoading = false;
    });
  }

  onSetOption(status: string) {
    this.isLoading = true;
    this.status = status;

    console.log(this.status, 'this.status');
    // if(status === '2') {
    //   this.payoutAvg(this.groupLifeCycleId);
    // } else {
    //   if(this.groupLifeCycleId !== undefined) {
    //     this.cycleAvg(this.groupLifeCycleId);
    //   }
    // }
  };


  onSave(): void {
    this.form.markAllAsTouched();
    // if (this.form.invalid) {
    //   return;
    // }

    this.isLoading = true;

    this.userService.requestSafeKeepingWithdral(
        this.groupId,
        this.userId,
        this.avgAmount,
        this.form.value.date,
        this.form.value.reason,
        "Savings"
      ).subscribe((response: any) => {
        this.form.reset();
        document.getElementById('closePopupRequest').click();
        this.isLoading = false;
        if (response.success === '1') {
          // this.toastr.success(response.message);
        } else {
          // this.toastr.error(response.message);
        }
      });
  };

  onClose() {
    this.form.reset();
  }

}
