import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/service/auth.service';
import { SharedService } from 'src/app/service/shared.service';
import { finalize } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
      service_id: new FormControl('', { validators: [Validators.required] }),
      // price: new FormControl('', { validators: [Validators.required] }),
      company_name: new FormControl(''),
      description: new FormControl(null, { validators: [Validators.required] }),
      mobile: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      website: new FormControl('', {}),
      location: new FormControl('', { validators: [Validators.required] }),
      latitude: new FormControl('0.0000'),
      longitude: new FormControl('0.0000')
    });
  }

  private resetImageState(): void {
    this.selectedImages.forEach((image) => URL.revokeObjectURL(image.previewUrl));
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
        if (typeof item === 'string') {
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
      service?.company_logo_url ||
      service?.company_logo_thumb ||
      service?.company_logo ||
      service?.logo_url ||
      service?.logo ||
      ''
    );
  }

  private readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('Unable to read image file.'));
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

  onCompanyLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.toastr.error('Please select an image file for the company logo.');
      input.value = '';
      return;
    }

    this.companyLogoFile = file;
    this.setCompanyLogoPreview(file);
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

    const validFiles = files.filter((file) => file.type.startsWith('image/'));
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

    const selectedWithPreview = await Promise.all(acceptedFiles.map(async (file) => ({
      file,
      previewUrl: await this.buildPreviewUrl(file)
    })));
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
      // this.serviceOptions = Array.isArray(services)
      //   ? services
      //   : services
      //     ? [services]
      //     : [];

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
      service_id: '',
      // price: '',
      company_name: '',
      description: '',
      mobile: '',
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
      service_id: '',
      // price: '',
      company_name: '',
      description: '',
      mobile: '',
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

    const serviceData = new FormData();

    if (this.mode === 'update') {
      serviceData.set('user_service_id', String(this.selectedServiceId));

      if (this.removedImageIds.length > 0) {
        serviceData.set('delete_image_ids', this.removedImageIds.join(','));
      }
    } else {
      serviceData.set('user_id', String(this.userId));
      serviceData.set('service_id', String(this.form.value.service_id));
    }

    serviceData.set('description', this.form.value.description);
    serviceData.set('company_name', this.form.value.company_name || '');
    serviceData.set('mobile', this.form.value.mobile);
    serviceData.set('email', this.form.value.email);
    serviceData.set('website', this.form.value.website);
    serviceData.set('location', this.form.value.location);

    if (this.companyLogoFile) {
      serviceData.set('company_logo', this.companyLogoFile, this.companyLogoFile.name);
    }

    this.selectedImages.forEach(image => {
      serviceData.append('images[]', image.file, image.file.name);
    });

    const endpoint =
      this.mode === 'update'
        ? '/updateUserService'
        : '/createService';

    this.sharedService.postAPI(endpoint, serviceData).subscribe({
      next: (response: any) => {
        this.isLoadingForm = false;

        if (response?.success === '1') {
          this.toastr.success(response.message);
          this.closeModal();
          this.getList();
        } else {
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
    this.selectedServiceId = service?.user_service_id || service?.id || '';
    this.resetImageState();
    this.existingImages = this.buildExistingImages(service);
    this.companyLogoPreviewUrl = this.getCompanyLogoUrl(service);
    this.form.patchValue({
      service_id: service?.service_id || '',
      // price: service?.price || '',
      company_name: service?.company_name || '',
      description: service?.description || service?.provider_description || '',
      mobile: service?.mobile || '',
      email: service?.email || '',
      website: service?.website || '',
      location: service?.location || '',
      latitude: service?.latitude || '',
      longitude: service?.longitude || ''
    });
    this.setServiceControlState();
  }


}
