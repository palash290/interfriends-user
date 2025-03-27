import { Component, OnInit, Input, SimpleChange, OnChanges, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService} from '../../../service/auth.service';
import { UserService} from '../../../service/user.service';
import { UserList } from 'src/app/model/userList.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  isLoading = true;
  isLoadingUpdate = false;
  form: FormGroup;
  userId: string;
    user: UserList;
  imagePreview = 'assets/img/default-user-icon.jpg';

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.form = new FormGroup({
      first_name: new FormControl(null, { validators: [Validators.required] }),
      last_name: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      dob: new FormControl(null, { validators: [Validators.required] }),
      mobile_number: new FormControl(null, { validators: [Validators.required] }),
      home_number: new FormControl(null, { validators: [Validators.required] }),
      emergency_number: new FormControl(null, { validators: [Validators.required] }),
      kin_name: new FormControl(null, { validators: [Validators.required] }),
      kin_number: new FormControl(null, { validators: [Validators.required] }),
      address_line_1: new FormControl(null, { validators: [Validators.required] }),
      address_line_2: new FormControl(null, { validators: [Validators.required] }),
      post_code: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null, { validators: [Validators.required] }),
      employement_type: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {}),
      Uniqueid : new FormControl(null, { validators: [Validators.required] }),
    });


    this.userService.getUserInfo(this.userId)
          .subscribe((response: any) => {
            this.user =  response.userinfo;
            console.log("response", response)
            this.form.patchValue({
              first_name: this.user.first_name,
              last_name: this.user.last_name,
              email: this.user.email,
              dob: this.user.dob,
              mobile_number: this.user.mobile_number,
              home_number: this.user.home_number,
              emergency_number: this.user.emergency_number,
              kin_name: this.user.kin_name,
              kin_number: this.user.kin_number,
              address_line_1: this.user.address_line_1,
              address_line_2: this.user.address_line_2,
              post_code: this.user.post_code,
              city: this.user.city,
              employement_type: this.user.employement_type,
              Uniqueid : this.user.unique_id,

            });
            this.isLoading = false;
            this.imagePreview = this.user.profile_image;
          });
  }

  onImagePicked(event: Event): any {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  onSave(): void {
    console.log('save');
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.isLoadingUpdate = true;
    console.log("out", this.isLoadingUpdate)
    this.userService.editUser(
      this.userId,
      this.form.value.first_name,
      this.form.value.last_name,
      this.form.value.email,
      this.form.value.dob,
      this.form.value.mobile_number,
      this.form.value.home_number,
      this.form.value.emergency_number,
      this.form.value.kin_name,
      this.form.value.kin_number,
      this.form.value.address_line_1,
      this.form.value.address_line_2,
      this.form.value.post_code,
      this.form.value.city,
      this.form.value.image,
      this.form.value.employement_type
    ).subscribe((response: any) => {
      // this.form.reset();
      // this.imagePreview = 'assets/img/default-user-icon.jpg';
      console.log("innnn", this.isLoadingUpdate)
      this.isLoadingUpdate = false;
      if (response.success === '1') {
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  backClicked() {
    this._location.back();
  }

}
