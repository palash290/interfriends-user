import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/service/auth.service';
import { SharedService } from 'src/app/service/shared.service';
import { finalize } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
declare const require: any;
const { PhoneNumberUtil } = require('google-libphonenumber');

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {

  userId: any;
  isLoading = true;
  isLoader = true;
  serviceList: any[] = [];
  serviceOptions: any[] = [];
  selectedService: any = null;
  selectedServiceImages: Array<{ id: string | number | null; name: string; url: string }> = [];
  form: FormGroup;
  mode = 'create';
  selectedServiceId = '';
  selectedImages: Array<{ file: File; previewUrl: any }> = [];
  existingImages: Array<{ id: string | number | null; name: string; url: string }> = [];
  removedImageIds: Array<string | number> = [];
  companyLogoFile: File | null = null;
  companyLogoPreviewUrl = '';
  imageError = '';
  readonly maxImages = 5;
  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  preferredCountries = [CountryISO.UnitedKingdom, CountryISO.India, CountryISO.UnitedStates];
  mobileCountryISO = CountryISO.UnitedKingdom;
  mobileCountryCode = '+44';
  private readonly phoneUtil = PhoneNumberUtil.getInstance();

  constructor(
    public authService: AuthService,
    public sharedService: SharedService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.isLoader = true;
    this.getList();
    this.initForm();
    this.loadServiceOptions();
  }

  initForm(): void {
    this.form = new FormGroup({
      user_service_id: new FormControl(''),
      service_id: new FormControl('', { validators: [Validators.required] }),
      category_name: new FormControl({ value: '', disabled: true }),
      subcategory_name: new FormControl({ value: '', disabled: true }),
      // price: new FormControl('', { validators: [Validators.required] }),
      company_name: new FormControl(''),
      description: new FormControl(null, { validators: [Validators.required] }),
      mobile: new FormControl('', { validators: [Validators.required] }),
      country_code: new FormControl(this.mobileCountryCode, { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      website: new FormControl('', {}),
      location: new FormControl('', { validators: [Validators.required] }),
      latitude: new FormControl('0.0000'),
      longitude: new FormControl('0.0000')
    });
  }

  private resetImageState(): void {
    this.selectedImages.forEach((image) => {
      if (typeof image?.previewUrl === 'string' && image.previewUrl.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(image.previewUrl);
        } catch (_) {}
      }
    });
    this.selectedImages = [];
    this.existingImages = [];
    this.removedImageIds = [];
    this.companyLogoFile = null;
    this.companyLogoPreviewUrl = '';
    this.imageError = '';
  }

  private setServiceControlState(): void {
    const serviceControl = this.form?.get('service_id');
    if (!serviceControl) {
      return;
    }

    if (this.mode === 'update') {
      serviceControl.disable({ emitEvent: false });
      serviceControl.clearValidators();
    } else {
      serviceControl.enable({ emitEvent: false });
      serviceControl.setValidators([Validators.required]);
    }

    serviceControl.updateValueAndValidity({ emitEvent: false });
  }

  private setServiceDetails(serviceId: any): void {
    const selectedService = this.serviceOptions.find((service) => String(service?.id) == String(serviceId));

    this.form?.patchValue({
      category_name: selectedService?.category_name || '',
      subcategory_name: selectedService?.subcategory_name || ''
    }, { emitEvent: false });
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

  private normalizePhoneNumber(value: any): string {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      return value;
    }

    return value?.number;
  }

  private getActiveExistingImageCount(): number {
    return this.existingImages.length;
  }

  getCurrentImageCount(): number {
    return this.getActiveExistingImageCount() + this.selectedImages.length;
  }

  private buildExistingImages(service: any): Array<{ id: string | number | null; name: string; url: string }> {
    const candidates = [
      service?.images,
      service?.service_images,
      service?.user_service_images,
      service?.image_list,
      service?.images_data
    ];

    const source = candidates.find((value) => Array.isArray(value)) || [];

    return source
      .map((item: any, index: number) => {
        if (typeof item == 'string') {
          return {
            id: null,
            name: `Image ${index + 1}`,
            url: item
          };
        }

        return {
          id: item?.id ?? item?.image_id ?? item?.user_service_image_id ?? null,
          name: item?.name ?? item?.image_name ?? item?.file_name ?? `Image ${index + 1}`,
          url: item?.url ?? item?.image_url ?? item?.path ?? item?.image ?? ''
        };
      })
      .filter((image: any) => image.url || image.name);
  }

  private getCompanyLogoUrl(service: any): string {
    return (
      service?.company_logo ||
      service?.company_logo_url ||
      service?.company_logo_thumb ||
      service?.logo_url ||
      service?.logo ||
      ''
    );
  }

  private pickFirstValue(...values: any[]): any {
    return values.find((value) => value !== null && value !== undefined && value !== '');
  }

  private readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  }

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
            const maxDimension = 1920;
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
                const safeBaseName = (file.name || 'image')
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

  private async buildPreviewUrl(file: File): Promise<SafeUrl> {
    const dataUrl = await this.readFileAsDataUrl(file);
    return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
  }

  private async setCompanyLogoPreview(file: File): Promise<void> {
    const dataUrl = await this.readFileAsDataUrl(file);
    this.companyLogoPreviewUrl = dataUrl;
  }

  async onCompanyLogoSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    if (!file) {
      return;
    }

    if (!this.isImageFile(file)) {
      this.toastr.error('Please select a valid image file for the company logo.');
      input.value = '';
      return;
    }

    try {
      const preparedFile = await this.prepareUploadFile(file);
      this.companyLogoFile = preparedFile;
      await this.setCompanyLogoPreview(preparedFile);
    } catch (error) {
      console.warn('Company logo processing warning:', error);
      this.companyLogoFile = file;
      await this.setCompanyLogoPreview(file);
    }

    input.value = '';
  }

  triggerCompanyLogoPicker(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  async onImagesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files || []);

    this.imageError = '';

    if (!files.length) {
      return;
    }

    const validFiles = files.filter((file) => this.isImageFile(file));
    if (validFiles.length !== files.length) {
      this.imageError = 'Only image files are allowed.';
    }

    const remainingSlots = this.maxImages - this.getCurrentImageCount();
    if (remainingSlots <= 0) {
      this.imageError = `You can upload up to ${this.maxImages} images.`;
      input.value = '';
      return;
    }

    const acceptedFiles = validFiles.slice(0, remainingSlots);
    if (validFiles.length > remainingSlots) {
      this.imageError = `You can upload only ${remainingSlots} more image${remainingSlots === 1 ? '' : 's'}.`;
    }

    const selectedWithPreview = await Promise.all(
      acceptedFiles.map(async (file) => {
        const preparedFile = await this.prepareUploadFile(file);
        return {
          file: preparedFile,
          previewUrl: await this.buildPreviewUrl(preparedFile)
        };
      })
    );

    this.selectedImages = [...this.selectedImages, ...selectedWithPreview];
    input.value = '';
  }

  removeNewImage(index: number): void {
    this.selectedImages.splice(index, 1);
    this.selectedImages = [...this.selectedImages];
    this.imageError = '';
  }

  removeExistingImage(image: { id: string | number | null }): void {
    if (image?.id !== null && image?.id !== undefined) {
      this.removedImageIds = [...this.removedImageIds, image.id];
    }

    this.existingImages = this.existingImages.filter((current) => current !== image);
    this.imageError = '';
  }

  loadServiceOptions(): void {
    const serviceData = new FormData();
    this.sharedService.postAPIAdmin('/serviceList', serviceData).subscribe((response: any) => {
      const services = response?.services || response?.serviceList || response?.lists || response?.data || [];
      const serviceArray = Array.isArray(services)
        ? services
        : services
          ? [services]
          : [];

      // Remove services with status == 0
      this.serviceOptions = serviceArray.filter(service => service.status != 0);
    });
  }

  getList() {
    const formUrlData = new FormData();
    formUrlData.set('user_id', this.userId);
    this.isLoader = true;
    this.sharedService.postAPI('/getMyAllServices', formUrlData)
      .pipe(finalize(() => {
        this.isLoader = false;
        this.isLoading = false;
      }))
      .subscribe((response: any) => {
        const services = response?.services;
        this.serviceList = Array.isArray(services)
          ? services
          : services
            ? [services]
            : [];
      });
  }

  viewServiceDetails(service: any) {
    this.selectedService = service;
    this.selectedServiceImages = this.buildExistingImages(service);
  }

  onOpenCreate(): void {
    this.mode = 'create';
    this.selectedServiceId = '';
    this.resetImageState();
    this.form.reset({
      user_service_id: '',
      service_id: '',
      category_name: '',
      subcategory_name: '',
      // price: '',
      company_name: '',
      description: '',
      mobile: '',
      country_code: this.mobileCountryCode,
      email: '',
      website: '',
      location: '',
      latitude: '',
      longitude: ''
    });
    this.setServiceControlState();
  }

  closeModal(): void {
    this.resetImageState();
    this.form.reset({
      user_service_id: '',
      service_id: '',
      category_name: '',
      subcategory_name: '',
      // price: '',
      company_name: '',
      description: '',
      mobile: '',
      country_code: this.mobileCountryCode,
      email: '',
      website: '',
      location: '',
      latitude: '',
      longitude: ''
    });
    this.mode = 'create';
    this.selectedServiceId = '';
    this.setServiceControlState();
    const closeButton = document.getElementById('closePopup');
    if (closeButton) {
      closeButton.click();
    }
  }

  isLoadingForm = false;

  onSave(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    if (this.getCurrentImageCount() > this.maxImages) {
      this.toastr.error(`You can upload up to ${this.maxImages} images.`);
      return;
    }

    this.isLoadingForm = true;
    const rawValue = this.form.getRawValue();
    const userServiceId = String(rawValue.user_service_id || this.selectedServiceId || '').trim();

    if (this.mode === 'update' && !userServiceId) {
      this.isLoadingForm = false;
      this.toastr.error('User Service ID is missing. Please reopen the edit form and try again.');
      return;
    }

    const serviceData = new FormData();

    if (this.mode == 'update') {
      serviceData.append('user_service_id', userServiceId);
      serviceData.append('service_id', String(rawValue.service_id || '').trim());
      serviceData.append('user_id', String(this.userId || '').trim());

      if (this.removedImageIds.length > 0) {
        serviceData.append('delete_image_ids', this.removedImageIds.join(','));
      }
    } else {
      serviceData.append('user_id', this.userId);
      serviceData.append('service_id', String(rawValue.service_id || this.form.value.service_id || '').trim());
    }

    serviceData.append('description', rawValue.description || '');
    serviceData.append('company_name', rawValue.company_name || '');
    serviceData.append('country_code', rawValue.country_code || this.mobileCountryCode);
    serviceData.append('mobile', this.normalizePhoneNumber(rawValue.mobile));
    serviceData.append('email', rawValue.email || '');
    serviceData.append('website', rawValue.website || '');
    serviceData.append('location', rawValue.location || '');

    if (this.companyLogoFile) {
      serviceData.append('company_logo', this.companyLogoFile, this.companyLogoFile.name);
    }

    this.selectedImages.forEach(image => {
      if (image?.file) {
        serviceData.append('images[]', image.file, image.file.name);
      }
    });

    const endpoint =
      this.mode == 'update'
        ? '/updateUserService'
        : '/createService';

    this.sharedService.postAPIFD(endpoint, serviceData).subscribe({
      next: (response: any) => {
        this.isLoadingForm = false;

        if (response?.success == '1') {
          this.toastr.success(response.message);
          this.closeModal();
          this.getList();
        }
        else {
          this.toastr.error(response?.message || 'Unable to save service');
        }
      },
      error: (error) => {
        this.isLoadingForm = false;
        console.error(error);
        this.toastr.error('Something went wrong. Please try again.');
      }
    });
  }

  onEdit(service: any): void {
    this.mode = 'update';
    this.selectedServiceId = String(service?.user_service_id || '');
    this.resetImageState();
    this.existingImages = this.buildExistingImages(service);
    this.companyLogoPreviewUrl = this.getCompanyLogoUrl(service);
    const dialCode = this.normalizeDialCode(
      this.pickFirstValue(service?.country_code, service?.dial_code, service?.mobile_country_code)
    ) || this.mobileCountryCode;
    this.form.patchValue({
      user_service_id: this.selectedServiceId,
      service_id: service?.service_id || '',
      category_name: service?.category_name || '',
      subcategory_name: service?.subcategory_name || '',
      // price: service?.price || '',
      company_name: service?.company_name || '',
      description: this.pickFirstValue(
        service?.description,
        service?.provider_description,
        service?.service_description
      ) || '',
      mobile: service?.mobile || '',
      country_code: dialCode,
      email: service?.email || '',
      website: service?.website || '',
      location: service?.location || '',
      latitude: service?.latitude || '',
      longitude: service?.longitude || ''
    });
    this.mobileCountryCode = dialCode;
    this.mobileCountryISO = this.dialCodeToCountryISO(this.mobileCountryCode);
    if (service?.service_id) {
      this.setServiceDetails(service.service_id);
    }
    this.setServiceControlState();
  }

  onServiceChange(): void {
    const serviceId = this.form?.get('service_id')?.value;
    this.setServiceDetails(serviceId);
  }

  onMobileCountryChange(country: any): void {
    this.mobileCountryCode = this.normalizeDialCode(country) || this.mobileCountryCode;
    this.mobileCountryISO = this.dialCodeToCountryISO(this.mobileCountryCode);
    this.form.get('country_code')?.setValue(this.mobileCountryCode);
  }

}

