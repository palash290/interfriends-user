import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-change-user-password',
  templateUrl: './change-user-password.component.html',
  styleUrls: ['./change-user-password.component.css']
})
export class ChangeUserPasswordComponent implements OnInit {

  userId: string;
  form: FormGroup;
  isLoading = true;
  showStatus = false;
  checkPassword: boolean;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      password: new FormControl(null, {validators: [Validators.required]}),
      confirmPassword: new FormControl(null, {validators: [Validators.required]})
    });
    this.userId = this.authService.getUserId();
  }


  checkPasswords() {
    let pass = this.form.get('password').value;
    let confirmPass = this.form.get('confirmPassword').value;

    if (pass === confirmPass) {
      this.checkPassword = false;
    } else {
      this.checkPassword = true;
    }
    return this.checkPassword;
  }


  showPassword() {
    this.showStatus = !this.showStatus;
  }


  onSave() {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.checkPassword) {
      return;
    }

    this.isLoading = false;

    this.userService.resetPassword(
      this.form.value.password,
      this.form.value.confirmPassword,
      this.userId)
      .subscribe((response: any) => {
        this.isLoading = true;
        if (response.success === '1') {
          this.toastr.success(response.message);
        } else {
          this.toastr.error(response.message);
        }
    });
  }
}
