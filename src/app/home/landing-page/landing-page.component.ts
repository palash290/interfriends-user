import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  isLoading = false;
  form: FormGroup;

  constructor(public sharedService: SharedService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      mobile_number: new FormControl(null, { validators: [Validators.required] }),
      country: new FormControl(null, { validators: [Validators.required] }),
      message: new FormControl(null, { validators: [Validators.required] })
    });
  }


  onSave(): void {
    this.form.markAllAsTouched();
    const formData = new FormData();

    formData.append('name', this.form.value.name)
    formData.append('email', this.form.value.email)
    formData.append('mobile_number', this.form.value.mobile_number)
    formData.append('country', this.form.value.country)
    formData.append('message', this.form.value.message)

    if (this.form.invalid) {
      return;
    }
    
    this.isLoading = true;

    this.sharedService.postAPI('/contact-us', formData).subscribe(
      {
        next: (response: any) => {
          if (response.success == 1) {
            this.form.reset();
            this.isLoading = false;
            this.toastr.success(response.message);
          } else {
            this.isLoading = false;
            this.toastr.error(response.message);
          }
        }, error: (err: any) => {
          console.log(err);
        }
      }
    );

  }

  items = [1, 2, 3, 4, 5];
  customOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  };


}
