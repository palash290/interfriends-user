import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-get-user-detail',
  templateUrl: './get-user-detail.component.html',
  styleUrls: ['./get-user-detail.component.css']
})
export class GetUserDetailComponent implements OnInit {

  isLoading = false;
  form: FormGroup;

  constructor(
    public authService: AuthService,
    public sharedService: SharedService,
    public route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] }),
      name: new FormControl(null, { validators: [Validators.required] })
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
      this.form.value.name
    );
    this.isLoading = false;

    this.form.reset();
  }





  showModal = false;
  apiResponse: any = null;

  checkEmail(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const authData = new FormData();
    authData.append('email', this.form.value.email);
    authData.append('name', this.form.value.name);
    this.isLoading = true;
    this.sharedService.postAPI('/checkRecommendedUser', authData).subscribe(
      (res: any) => {
        // if(res.success == '0'){

        // }
        // debugger
        this.apiResponse = res;
        this.showModal = true;
        this.isLoading = false;
      },
      (err) => {
        this.apiResponse = { success: false }; // Handle as failed
        // this.showModal = true;
        this.isLoading = false;
      }
    );
  }

  closeModal(): void {
    this.showModal = false;
  }




}
