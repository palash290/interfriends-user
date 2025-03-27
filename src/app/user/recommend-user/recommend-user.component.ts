import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserList } from 'src/app/model/userList.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-recommend-user',
  templateUrl: './recommend-user.component.html',
  styleUrls: ['./recommend-user.component.css']
})
export class RecommendUserComponent implements OnInit {
  userList: UserList[] = [];
  form: FormGroup;
  isLoading = false;
  userId: string;
  groupId: string;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private toastr: ToastrService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.groupId = this.authService.getgroupId();

    this.userService.allRecommnedUserList(this.groupId).subscribe((response: any) => {
      this.userList = response.userList;
    });

    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      email	: new FormControl(null, { validators: [Validators.required] }),
      mobile_number	: new FormControl(null, { validators: [Validators.required] }),
      friend_employed	: new FormControl(null, { validators: [Validators.required] }),
      employement_type	: new FormControl(null, { validators: [Validators.required] }),
      know_this_person	: new FormControl(null, { validators: [Validators.required] }),
      know_them_as_what	: new FormControl(null, { validators: [Validators.required] }),
      recommending_this_person	: new FormControl(null, { validators: [Validators.required] }),
      recommend_user_by	: new FormControl(null, { validators: [Validators.required] })
    });
  };



  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.userService.recommendUser(
        this.form.value.name,
        this.form.value.email,
        this.form.value.mobile_number,
        this.form.value.friend_employed,
        this.form.value.employement_type,
        this.form.value.know_this_person,
        this.form.value.know_them_as_what,
        this.form.value.recommending_this_person,
        this.form.value.recommend_user_by
      ).subscribe((response: any) => {
        this.form.reset();
        this.isLoading = false;
        if (response.success === '1') {
          this.toastr.success(response.message);
          console.log(this.form.get('recommend_user_by').value); // Should log ''
        } else {
          this.toastr.error(response.message);
        }
      });
  }

  backClicked() {
    this._location.back();
  }

}
