import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  isLoading = false;
  form: FormGroup;

  constructor(
    public authService: AuthService,
    public route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.form = new FormGroup({
      first_name: new FormControl(null, { validators: [Validators.required] }),
      last_name: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      dob: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] }),
      mobile_number: new FormControl(null, { validators: [Validators.required] }),
      home_number: new FormControl(null, { validators: [Validators.required] }),
      emergency_number: new FormControl(null, { validators: [Validators.required] }),
      kin_name: new FormControl(null, { validators: [Validators.required] }),
      kin_number: new FormControl(null, { validators: [Validators.required] }),
      address_line_1: new FormControl(null, { validators: [Validators.required] }),
      address_line_2: new FormControl(null, { validators: [Validators.required] }),
      post_code: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null, { validators: [Validators.required] }),
    });
  }


  onLogin(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.authService.login(
      this.form.value.email,
      this.form.value.password
    );

    this.form.reset();
  }

  onSave(): void {
    this.form.markAllAsTouched();
    console.log(this.form.invalid);
    console.log(this.form.value.dob, 'dob');
    const formData = new FormData();

    formData.append('first_name', this.form.value.first_name)
    formData.append('last_name', this.form.value.last_name)
    formData.append('email', this.form.value.email)
    formData.append('dob', this.form.value.dob)
    formData.append('mobile_number', this.form.value.mobile_number)
    formData.append('home_number', this.form.value.home_number)
    formData.append('emergency_number', this.form.value.emergency_number)
    formData.append('kin_name', this.form.value.kin_name)
    formData.append('kin_number', this.form.value.kin_number)
    formData.append('address_line_1', this.form.value.address_line_1)
    formData.append('address_line_2', this.form.value.address_line_2)
    formData.append('post_code', this.form.value.post_code)
    formData.append('city', this.form.value.city)
    formData.append('password', this.form.value.password)

    // formData.append('image',  this.form.value.unique_id)


    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    this.authService.registerUser(formData).subscribe(
      {
        next: (response: any) => {
          if (response.success == 1) {
            this.form.reset();
            this.isLoading = false;
            this.router.navigate(['/']);
            this.toastr.success(response.message);

          } else {
            this.isLoading = false;
            this.toastr.error(response.message);
          }

          console.log(response);

        }, error: (err: any) => {
          console.log(err);
        }
      }


      //   (response: any) => {
      // console.log("out", response)


      // if (response.success === '1') {
      //   // this.valueChange.emit('add');

      // } else {
      //   this.toastr.error(response.message);
      // }
    );

  }
}
