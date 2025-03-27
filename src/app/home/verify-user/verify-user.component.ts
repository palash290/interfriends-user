import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService} from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Router} from '@angular/router';


@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  showStatus = false;
  token: string;
  checkPassword: boolean;

  constructor(
    public userService: UserService,
    private toastr: ToastrService,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl(null, {validators: [Validators.required]}),
      confirmPassword: new FormControl(null, {validators: [Validators.required]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.token = paramMap.get('token');
    });
  }


  checkPasswords(): any {
    let pass = this.form.get('password').value;
    let confirmPass = this.form.get('confirmPassword').value;

    if (pass === confirmPass) {
      this.checkPassword = false;
    } else {
      this.checkPassword = true;
    }
    return this.checkPassword;
  }

  onSave(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid || this.checkPassword) {
      return;
    }

    this.isLoading = true;
    this.userService.verifyUser(this.form.value.password, this.token).subscribe((response: any) => {
      if (response.success  === '1') {
        this.toastr.success(response.message);
        this.router.navigate(['/']);
      } else {
        this.toastr.error(response.message);
        this.router.navigate(['/']);
      }
    });
  }

}
