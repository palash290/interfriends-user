import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/auth.service';
import { UserService } from '../../../service/user.service';
import { UserList } from 'src/app/model/userList.model';
import { Location } from '@angular/common';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
declare const require: any;
const { PhoneNumberUtil } = require('google-libphonenumber');

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  isLoading = true;
  isLoadingUpdate = false;
  form: FormGroup;
  userId: string;
  user: UserList;
  imagePreview = 'assets/img/default-user-icon.jpg';
  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  preferredCountries = [CountryISO.UnitedKingdom, CountryISO.India, CountryISO.UnitedStates];
  mobileCountryISO = CountryISO.UnitedKingdom;
  homeCountryISO = CountryISO.UnitedKingdom;
  emergencyCountryISO = CountryISO.UnitedKingdom;
  kinCountryISO = CountryISO.UnitedKingdom;
  countryCode = '+44';
  emergencyCountryCode = '+44';
  kinCountryCode = '+44';
  homeCountryCode = '+44';
  private readonly phoneUtil = PhoneNumberUtil.getInstance();

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private toastr: ToastrService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.form = new FormGroup({
      first_name: new FormControl(null, { validators: [Validators.required] }),
      last_name: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      dob: new FormControl(null, { validators: [Validators.required] }),
      mobile_number: new FormControl(null, { validators: [Validators.required] }),
      home_number: new FormControl(null, { validators: [Validators.required] }),
      emergency_number: new FormControl(null, { validators: [Validators.required] }),
      kin_name: new FormControl(null, { validators: [Validators.required] }),
      kin_number: new FormControl(null, { validators: [Validators.required] }),
      address_line_1: new FormControl(null, { validators: [Validators.required] }),
      address_line_2: new FormControl(null, { validators: [Validators.required] }),
      post_code: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null, { validators: [Validators.required] }),
      employement_type: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {}),
      Uniqueid: new FormControl(null, { validators: [Validators.required] }),
    });


    this.userService.getUserInfo(this.userId)
      .subscribe((response: any) => {
        this.user = response.userinfo;
        console.log("response", response)
        this.form.patchValue({
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          email: this.user.email,
          dob: this.user.dob,
          mobile_number: this.user.mobile_number,
          home_number: this.user.home_number,
          emergency_number: this.user.emergency_number,
          kin_name: this.user.kin_name,
          kin_number: this.user.kin_number,
          address_line_1: this.user.address_line_1,
          address_line_2: this.user.address_line_2,
          post_code: this.user.post_code,
          city: this.user.city,
          employement_type: this.user.employement_type,
          Uniqueid: this.user.unique_id
        });

        this.countryCode = this.normalizeDialCode((this.user as any)?.country_code || (this.user as any)?.mobile_country_code) || this.countryCode;
        this.homeCountryCode = this.normalizeDialCode((this.user as any)?.home_country_code) || this.homeCountryCode;
        this.emergencyCountryCode = this.normalizeDialCode((this.user as any)?.emergency_country_code) || this.emergencyCountryCode;
        this.kinCountryCode = this.normalizeDialCode((this.user as any)?.kin_country_code) || this.kinCountryCode;
        this.mobileCountryISO = this.dialCodeToCountryISO(this.countryCode);
        this.homeCountryISO = this.dialCodeToCountryISO(this.homeCountryCode);
        this.emergencyCountryISO = this.dialCodeToCountryISO(this.emergencyCountryCode);
        this.kinCountryISO = this.dialCodeToCountryISO(this.kinCountryCode);

        this.isLoading = false;
        this.imagePreview = this.user.profile_image;
      });
  }

  // onImagePicked(event: Event): any {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({ image: file });
  //   this.form.get('image').updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

  private isImageFile(file: File): boolean {
    if (!file) {
      return false;
    }
    const fileName = (file.name || '').toLowerCase();
    return (
      (file.type && file.type.startsWith('image/')) ||
      /\.(jpe?g|png|gif|webp|heic|heif|bmp|jfif)$/i.test(fileName)
    );
  }

  private async prepareUploadFile(file: File): Promise<File> {
    if (!file) {
      return file;
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const maxDimension = 1600;
            let width = img.naturalWidth || img.width;
            let height = img.naturalHeight || img.height;

            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              } else {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }

            canvas.width = width;
            canvas.height = height;

            const context = canvas.getContext('2d');
            if (!context) {
              resolve(file);
              return;
            }

            context.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  resolve(file);
                  return;
                }
                const safeBaseName = (file.name || 'profile_image')
                  .replace(/\.[^.]+$/, '')
                  .replace(/[^a-zA-Z0-9_-]/g, '_');
                try {
                  const prepared = new File([blob], `${safeBaseName}.jpg`, { type: 'image/jpeg' });
                  resolve(prepared);
                } catch (_) {
                  const blobFile = blob as any;
                  blobFile.name = `${safeBaseName}.jpg`;
                  blobFile.lastModified = Date.now();
                  resolve(blobFile);
                }
              },
              'image/jpeg',
              0.85
            );
          } catch (err) {
            console.warn('Canvas conversion failed, fallback to original file', err);
            resolve(file);
          }
        };
        img.onerror = (err) => {
          console.warn('Image element failed to load, fallback to original file', err);
          resolve(file);
        };
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  }

  async onImagePicked(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const rawFile = input.files?.[0];
    if (!rawFile) {
      return;
    }

    if (!this.isImageFile(rawFile)) {
      this.toastr.error('Please select a valid image file.');
      input.value = '';
      return;
    }

    const file = await this.prepareUploadFile(rawFile);
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  onSave(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.isLoadingUpdate = true;
    // console.log("out", this.isLoadingUpdate);

    const mobileNumber = this.normalizePhoneNumber(this.form.value.mobile_number.number);
    const homeNumber = this.normalizePhoneNumber(this.form.value.home_number.number);
    const emergencyNumber = this.normalizePhoneNumber(this.form.value.emergency_number.number);
    const kinNumber = this.normalizePhoneNumber(this.form.value.kin_number.number);

    this.userService.editUser(
      this.userId,
      this.form.value.first_name,
      this.form.value.last_name,
      this.form.value.email,
      this.form.value.dob,
      this.countryCode,
      mobileNumber,
      this.homeCountryCode,
      homeNumber,
      this.emergencyCountryCode,
      emergencyNumber,
      this.form.value.kin_name,
      this.kinCountryCode,
      kinNumber,
      this.form.value.address_line_1,
      this.form.value.address_line_2,
      this.form.value.post_code,
      this.form.value.city,
      this.form.value.image,
      this.form.value.employement_type
    ).subscribe((response: any) => {
      // this.form.reset();
      // this.imagePreview = 'assets/img/default-user-icon.jpg';
      console.log("innnn", this.isLoadingUpdate)
      this.isLoadingUpdate = false;
      if (response.success === '1') {
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    });
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

  onMobileCountryChange(country: any): void {
    this.countryCode = this.normalizeDialCode(country) || this.countryCode;
    this.mobileCountryISO = this.dialCodeToCountryISO(this.countryCode);
  }

  onHomeCountryChange(country: any): void {
    this.homeCountryCode = this.normalizeDialCode(country) || this.homeCountryCode;
    this.homeCountryISO = this.dialCodeToCountryISO(this.homeCountryCode);
  }

  onEmergencyCountryChange(country: any): void {
    this.emergencyCountryCode = this.normalizeDialCode(country) || this.emergencyCountryCode;
    this.emergencyCountryISO = this.dialCodeToCountryISO(this.emergencyCountryCode);
  }

  onKinCountryChange(country: any): void {
    this.kinCountryCode = this.normalizeDialCode(country) || this.kinCountryCode;
    this.kinCountryISO = this.dialCodeToCountryISO(this.kinCountryCode);
  }

  backClicked() {
    this._location.back();
  }

}
