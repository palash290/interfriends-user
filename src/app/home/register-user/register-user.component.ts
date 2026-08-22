import { Component, ElementRef, OnInit, VERSION, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City, Country, State } from 'country-state-city';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { SharedService } from 'src/app/service/shared.service';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
declare const require: any;
const { PhoneNumberUtil } = require('google-libphonenumber');

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  isLoading = false;
  form: UntypedFormGroup;
  token: string = '';
  recommend_id: any;
  private readonly defaultProfileImage = 'https://creativethoughtsinfo.com/interfriendsApp/assets/img/np_pro.png';
  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  preferredCountries = [CountryISO.UnitedKingdom, CountryISO.India, CountryISO.UnitedStates];
  mobileCountryISO = CountryISO.UnitedKingdom;
  homeCountryISO = CountryISO.UnitedKingdom;
  emergencyCountryISO = CountryISO.UnitedKingdom;
  kinCountryISO = CountryISO.UnitedKingdom;
  mobileCountryCode = '+44';
  homeCountryCode = '+44';
  emergencyCountryCode = '+44';
  kinCountryCode = '+44';
  private readonly phoneUtil = PhoneNumberUtil.getInstance();

  constructor(
    public authService: AuthService,
    public route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {

    this.isLoading = false;
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    this.recommend_id = this.route.snapshot.queryParamMap.get('recommend_id') || '';

    this.form = new UntypedFormGroup({
      first_name: new UntypedFormControl('', { validators: [Validators.required] }),
      last_name: new UntypedFormControl('', { validators: [Validators.required] }),
      email: new UntypedFormControl('', { validators: [Validators.required, Validators.email] }),
      dob: new UntypedFormControl(null, { validators: [Validators.required] }),
      password: new UntypedFormControl(null, { validators: [Validators.required] }),
      mobile_number: new UntypedFormControl('', { validators: [Validators.required] }),
      country_code: new UntypedFormControl(this.mobileCountryCode, { validators: [Validators.required] }),
      home_number: new UntypedFormControl('', { validators: [Validators.required] }),
      home_country_code: new UntypedFormControl(this.homeCountryCode, { validators: [Validators.required] }),
      emergency_number: new UntypedFormControl('', { validators: [Validators.required] }),
      emergency_country_code: new UntypedFormControl(this.emergencyCountryCode, { validators: [Validators.required] }),
      kin_name: new UntypedFormControl('', { validators: [Validators.required] }),
      kin_number: new UntypedFormControl('', { validators: [Validators.required] }),
      kin_country_code: new UntypedFormControl(this.kinCountryCode, { validators: [Validators.required] }),
      address_line_1: new UntypedFormControl('', { validators: [Validators.required] }),
      address_line_2: new UntypedFormControl('', { validators: [Validators.required] }),
      post_code: new UntypedFormControl('', { validators: [Validators.required] }),
      //country: new FormControl(null, { validators: [Validators.required] }),
      //state: new FormControl(null, { validators: [Validators.required] }),
      city: new UntypedFormControl('', { validators: [Validators.required] }),
      image: new UntypedFormControl(null, { validators: [Validators.required] }),
      id_proof: new UntypedFormControl(null, { validators: [Validators.required] }),
      employement_type: new UntypedFormControl(null, { validators: [Validators.required] }),
      acceptTerms: new UntypedFormControl(false, { validators: [Validators.requiredTrue] })
    });

    this.getUsers();

  }

  userData: any;

  getUsers() {
    this.sharedService.getApi(`/getRecommendedUserDetails/${this.recommend_id}`).subscribe({
      next: resp => {
        if (resp.success == "1") {
          this.userData = resp.users;
          const user = resp.users || {};
          this.form.patchValue({
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || '',
            dob: user.dob || null,
            mobile_number: user.mobile_number || '',
            country_code: this.normalizeDialCode(user.country_code) || this.mobileCountryCode,
            home_number: user.home_number || '',
            home_country_code: this.normalizeDialCode(user.home_country_code) || this.homeCountryCode,
            emergency_number: user.emergency_number || '',
            emergency_country_code: this.normalizeDialCode(user.emergency_country_code) || this.emergencyCountryCode,
            kin_name: user.kin_name || '',
            kin_number: user.kin_number || '',
            kin_country_code: this.normalizeDialCode(user.kin_country_code) || this.kinCountryCode,
            address_line_1: user.address_line_1 || '',
            address_line_2: user.address_line_2 || '',
            post_code: user.post_code || '',
            city: user.city || '',
            employement_type: user.employement_type || null
          });
          this.mobileCountryCode = this.normalizeDialCode(user.country_code) || this.mobileCountryCode;
          this.homeCountryCode = this.normalizeDialCode(user.home_country_code) || this.homeCountryCode;
          this.emergencyCountryCode = this.normalizeDialCode(user.emergency_country_code) || this.emergencyCountryCode;
          this.kinCountryCode = this.normalizeDialCode(user.kin_country_code) || this.kinCountryCode;
          this.mobileCountryISO = this.dialCodeToCountryISO(this.mobileCountryCode);
          this.homeCountryISO = this.dialCodeToCountryISO(this.homeCountryCode);
          this.emergencyCountryISO = this.dialCodeToCountryISO(this.emergencyCountryCode);
          this.kinCountryISO = this.dialCodeToCountryISO(this.kinCountryCode);
          this.previewImageAdd = user.profile_image;
          this.previewIdImage = user.id_proof_image;
        }
      },
      error: error => {
        console.log(error.message);
      }
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
    const rawForm = this.form.getRawValue();
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('profile_image', this.selectedFile);
    }


    if (this.selectedIdFile) {
      formData.append('id_proof_image', this.selectedIdFile);
    }

    // formData.append('first_name', this.form.value.first_name)
    // formData.append('last_name', this.form.value.last_name)
    // formData.append('email', this.form.value.email)
    formData.append('first_name', rawForm.first_name)
    formData.append('last_name', rawForm.last_name)
    formData.append('email', rawForm.email)
    formData.append('dob', rawForm.dob)
    formData.append('country_code', rawForm.country_code || this.mobileCountryCode)
    formData.append('mobile_number', this.normalizePhoneNumber(rawForm.mobile_number.number))
    formData.append('home_country_code', rawForm.home_country_code || this.homeCountryCode)
    formData.append('home_number', this.normalizePhoneNumber(rawForm.home_number.number))
    formData.append('emergency_country_code', rawForm.emergency_country_code || this.emergencyCountryCode)
    formData.append('emergency_number', this.normalizePhoneNumber(rawForm.emergency_number.number))
    formData.append('kin_name', rawForm.kin_name)
    formData.append('kin_country_code', rawForm.kin_country_code || this.kinCountryCode)
    formData.append('kin_number', this.normalizePhoneNumber(rawForm.kin_number.number))
    formData.append('address_line_1', rawForm.address_line_1)
    formData.append('address_line_2', rawForm.address_line_2)
    formData.append('post_code', rawForm.post_code)
    // formData.append('country', this.selectedCountry?.name)
    // formData.append('state', this.selectedState?.name)
    // formData.append('city', this.selectedCity?.name)
    formData.append('city', rawForm.city)
    formData.append('password', rawForm.password);
    formData.append('employement_type', rawForm.employement_type)

    if (this.token) {
      formData.append('token', this.token);
    }

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

  selectedFile!: File;
  previewImageAdd: string | ArrayBuffer | null = null;

  // Handle File Upload and Show Preview for Add and Edit Modals
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {

        this.previewImageAdd = reader.result;

      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  selectedIdFile!: File;
  previewIdImage: string | ArrayBuffer | null = null;

  onIdSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedIdFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {

        this.previewIdImage = reader.result;

      };
      reader.readAsDataURL(this.selectedIdFile);
    }
  }












  @ViewChild('country') country!: ElementRef;
  @ViewChild('city') city!: ElementRef;
  @ViewChild('state') state!: ElementRef;
  name = 'Angular ' + VERSION.major;
  countries: any = Country.getAllCountries();
  states: any = null;
  cities: any = null;

  selectedCountry: any;
  selectedState: any;
  selectedCity: any;

  onCountryChange($event: any): void {
    this.states = State.getStatesOfCountry(
      JSON.parse(this.country.nativeElement?.value)?.isoCode
    );
    this.selectedCountry = JSON.parse(this.country.nativeElement.value);
    this.cities = this.selectedState = this.selectedCity = null;
  }

  onStateChange($event: any): void {
    this.cities = City.getCitiesOfState(
      JSON.parse(this.country.nativeElement.value).isoCode,
      JSON.parse(this.state.nativeElement.value).isoCode
    );
    this.selectedState = JSON.parse(this.state.nativeElement.value);
    this.selectedCity = null;
  }

  onCityChange($event: any): void {
    this.selectedCity = JSON.parse(this.city.nativeElement.value);
  }

  clear(type: string): void {
    switch (type) {
      case 'country':
        this.selectedCountry =
          this.country.nativeElement.value =
          this.states =
          this.cities =
          this.selectedState =
          this.selectedCity =
          null;
        break;
      case 'state':
        this.selectedState =
          this.state.nativeElement.value =
          this.cities =
          this.selectedCity =
          null;
        break;
      case 'city':
        this.selectedCity = this.city.nativeElement.value = null;
        break;
    }
  }

  onMobileCountryChange(country: any): void {
    this.mobileCountryCode = this.normalizeDialCode(country) || this.mobileCountryCode;
    this.mobileCountryISO = this.dialCodeToCountryISO(this.mobileCountryCode);
    this.form.get('country_code')?.setValue(this.mobileCountryCode);
  }

  onHomeCountryChange(country: any): void {
    this.homeCountryCode = this.normalizeDialCode(country) || this.homeCountryCode;
    this.homeCountryISO = this.dialCodeToCountryISO(this.homeCountryCode);
    this.form.get('home_country_code')?.setValue(this.homeCountryCode);
  }

  onEmergencyCountryChange(country: any): void {
    this.emergencyCountryCode = this.normalizeDialCode(country) || this.emergencyCountryCode;
    this.emergencyCountryISO = this.dialCodeToCountryISO(this.emergencyCountryCode);
    this.form.get('emergency_country_code')?.setValue(this.emergencyCountryCode);
  }

  onKinCountryChange(country: any): void {
    this.kinCountryCode = this.normalizeDialCode(country) || this.kinCountryCode;
    this.kinCountryISO = this.dialCodeToCountryISO(this.kinCountryCode);
    this.form.get('kin_country_code')?.setValue(this.kinCountryCode);
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

  // private dialCodeToCountryISO(dialCode: string): CountryISO {
  //   switch (this.normalizeDialCode(dialCode)) {
  //     case '+91':
  //       return CountryISO.India;
  //     case '+44':
  //       return CountryISO.UnitedKingdom;
  //     case '+1':
  //       return CountryISO.UnitedStates;
  //     case '+61':
  //       return CountryISO.Australia;
  //     case '+27':
  //       return CountryISO.SouthAfrica;
  //     case '+971':
  //       return CountryISO.UnitedArabEmirates;
  //     case '+233':
  //       return CountryISO.Ghana;
  //     case '+33':
  //       return CountryISO.France;
  //     default:
  //       return CountryISO.UnitedKingdom;
  //   }
  // }

  private dialCodeToCountryISO(dialCode: string | undefined): CountryISO {
    const code = (dialCode || '').replace(/[^0-9]/g, '');

    if (!code) {
      return CountryISO.UnitedKingdom;
    }

    const regionCode = this.phoneUtil.getRegionCodeForCountryCode(Number(code));
    if (!regionCode || regionCode === 'ZZ') {
      return CountryISO.UnitedKingdom;
    }

    const matchedISO = Object.values(CountryISO).find(
      (iso) => iso.toLowerCase() === regionCode.toLowerCase()
    );

    return (matchedISO as CountryISO) || CountryISO.UnitedKingdom;
  }


}
