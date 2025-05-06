import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  isLoading = false;
  form: FormGroup;
  userForm: FormGroup;

  constructor(public sharedService: SharedService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.form = new FormGroup({
      first_name: new FormControl(null, { validators: [Validators.required] }),
      last_name: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      mobile_number: new FormControl(null, { validators: [Validators.required] }),
      message: new FormControl(null, { validators: [Validators.required] })
    });

    this.userForm = new FormGroup({
      first_name: new FormControl(null, { validators: [Validators.required] }),
      last_name: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      country_of_residence: new FormControl(null, { validators: [Validators.required] }),
      mobile_number: new FormControl(null, { validators: [Validators.required] }),
      profession: new FormControl(null, { validators: [Validators.required] }),
      type_of_employment: new FormControl('', { validators: [Validators.required] })
    });
  }


  onSave() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return
    }

    const formURlData = new FormData();
    formURlData.set('first_name', this.form.value.first_name);
    formURlData.set('last_name', this.form.value.last_name);
    formURlData.set('email', this.form.value.email);
    formURlData.set('phone_number', this.form.value.mobile_number);
    formURlData.set('message', this.form.value.message);

    this.isLoading = true;

    this.sharedService.postAPI('/saveContactUsDetails', formURlData).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.toastr.success(resp.message);
          this.form.reset();
          this.isLoading = false;
        } else {
          this.toastr.warning(resp.message);
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Login error:', error.message);
        this.isLoading = false;
      }
    });

  }

  @ViewChild('closeModal1') closeModal1!: ElementRef;

  onSubmit() {
    this.userForm.markAllAsTouched();
    if (!this.userForm.valid) {
      return
    }

    const formURlData = new FormData();
    formURlData.set('first_name', this.userForm.value.first_name);
    formURlData.set('last_name', this.userForm.value.last_name);
    formURlData.set('email', this.userForm.value.email);
    formURlData.set('phone_number', this.userForm.value.mobile_number);
    formURlData.set('country', this.userForm.value.country_of_residence);
    formURlData.set('profession', this.userForm.value.profession);
    formURlData.set('type_of_employment', this.userForm.value.type_of_employment);

    this.sharedService.postAPI('/saveInterestedUser', formURlData).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.toastr.success(resp.message);
          this.userForm.reset();
          this.closeModal1.nativeElement.click();
        } else {
          this.toastr.warning(resp.message);
        }
      },
      error: (error) => {
        console.error('Login error:', error.message);
      }
    });

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

  banners = [
    {
      image: 'assets/img/banner.png',
      title: 'Community-centred Savings Club',
      subtitle: '(Succeeding Together)',
      description: 'Join an Interfriends savings circle and<br>stay in control of your finances.'
    },
    {
      image: 'assets/img/collage_banner.png',
      title: 'Community-centred Savings Club',
      subtitle: '(Succeeding Together)',
      description: 'Join an Interfriends savings circle and<br>stay in control of your finances.'
    },
    // {
    //   image: 'assets/img/banner2.JPG',
    //   title: 'Community-centred Savings Club',
    //   subtitle: '(Succeeding Together)',
    //   description: 'Join an Interfriends savings circle and<br>stay in control of your finances.'
    // },
    // {
    //   image: 'assets/img/banner3.JPG',
    //   title: 'Community-centred Savings Club',
    //   subtitle: '(Succeeding Together)',
    //   description: 'Join an Interfriends savings circle and<br>stay in control of your finances.'
    // },
    // Add more slides as needed
  ];

  bannerOptions = {
    loop: true,
    items: 1,
    dots: true,
    navText: [
      '<span class="custom-prev"><i class="fa fa-arrow-left" aria-hidden="true"></i></span>',
      '<span class="custom-next"><i class="fa fa-arrow-right" aria-hidden="true"></i></span>'
    ],
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  };


}
