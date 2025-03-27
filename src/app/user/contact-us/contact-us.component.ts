import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

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

    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      email	: new FormControl(null, { validators: [Validators.required] }),
      mobile_number	: new FormControl(null, { validators: [Validators.required] }),
      message	: new FormControl('', { validators: [Validators.required] }),
    });
  }


  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.userService.contactUs(
        this.form.value.name,
        this.form.value.email,
        this.form.value.mobile_number,
        this.form.value.message
      ).subscribe((response: any) => {
        this.form.reset();
        this.isLoading = false;
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
