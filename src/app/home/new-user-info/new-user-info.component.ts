import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/service/shared.service';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-new-user-info',
  templateUrl: './new-user-info.component.html',
  styleUrls: ['./new-user-info.component.css']
})
export class NewUserInfoComponent implements OnInit {

  userForm: FormGroup;
  isLoading = false;
  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  preferredCountries = [CountryISO.UnitedKingdom, CountryISO.India, CountryISO.UnitedStates];
  defaultCountryISO = CountryISO.UnitedKingdom;
  countryCode = '+44';

  constructor(public sharedService: SharedService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      first_name: new FormControl(null, { validators: [Validators.required] }),
      last_name: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      country_of_residence: new FormControl(null, { validators: [Validators.required] }),
      mobile_number: new FormControl(null, { validators: [Validators.required] }),
      country_code: new FormControl(this.countryCode, { validators: [Validators.required] }),
      profession: new FormControl(null, { validators: [Validators.required] }),
      type_of_employment: new FormControl('', { validators: [Validators.required] })
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
    formURlData.set('phone_number', this.normalizePhoneNumber(this.userForm.value.mobile_number.number));
    formURlData.set('country_code', this.userForm.value.country_code || this.countryCode);
    formURlData.set('country', this.userForm.value.country_of_residence);
    formURlData.set('profession', this.userForm.value.profession);
    formURlData.set('type_of_employment', this.userForm.value.type_of_employment);

    this.isLoading = true;

    this.sharedService.postAPI('/saveInterestedUser', formURlData).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.toastr.success(resp.message);
          this.userForm.reset();
          this.closeModal1.nativeElement.click();
          this.isLoading = false;
        } else {
          this.toastr.warning(resp.message);
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error.message);
      }
    });

  }

  onCountryChange(country: any): void {
    this.countryCode = this.normalizeDialCode(country) || this.countryCode;
    this.userForm.get('country_code')?.setValue(this.countryCode);
  }

  private normalizePhoneNumber(value: any): string {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      return value;
    }

    return value?.e164Number || value?.internationalNumber || value?.nationalNumber || value?.number || '';
  }

  private normalizeDialCode(value: any): string {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      return value.startsWith('+') ? value : `+${value}`;
    }

    return value?.dialCode ? (String(value.dialCode).startsWith('+') ? String(value.dialCode) : `+${value.dialCode}`) : '';
  }


}
