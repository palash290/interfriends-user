import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService} from '../../service/auth.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  isLoading = false;
  form: FormGroup;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] })
    });
  }


  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.userService.forgetPassword(
      this.form.value.email
    ).subscribe((response: any) => {
      if (response.success  === '1') {
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }

      this.isLoading = false;
    });

    this.form.reset();
  }

}
