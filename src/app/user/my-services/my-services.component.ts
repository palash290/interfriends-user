import { Component, OnInit } from '@angular/core';
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
  form: FormGroup;
  mode = 'create';
  selectedServiceId = '';

  constructor(
    public authService: AuthService,
    public sharedService: SharedService,
    private toastr: ToastrService,
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
      price: new FormControl('', { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      mobile: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      website: new FormControl('', { validators: [Validators.required] }),
      location: new FormControl('', { validators: [Validators.required] }),
      latitude: new FormControl('', { validators: [Validators.required] }),
      longitude: new FormControl('', { validators: [Validators.required] })
    });
  }

  loadServiceOptions(): void {
    const serviceData = new FormData();
    this.sharedService.postAPIAdmin('/serviceList', serviceData).subscribe((response: any) => {
      const services = response?.services || response?.serviceList || response?.lists || response?.data || [];
      this.serviceOptions = Array.isArray(services)
        ? services
        : services
          ? [services]
          : [];
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
  }

  onOpenCreate(): void {
    this.mode = 'create';
    this.selectedServiceId = '';
    this.form.reset({
      service_id: '',
      price: '',
      description: '',
      mobile: '',
      email: '',
      website: '',
      location: '',
      latitude: '',
      longitude: ''
    });
  }

  closeModal(): void {
    this.form.reset({
      service_id: '',
      price: '',
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

    this.isLoadingForm = true;

    const serviceData = new FormData();
    // if (this.mode === 'update') {
    //   serviceData.append('user_service_id', this.selectedServiceId);
    // }
    serviceData.set('user_id', this.userId);
    if (this.mode === 'update') {
      serviceData.append('user_service_id', this.selectedServiceId);
    } else {
      serviceData.set('service_id', this.form.value.service_id);
    }
    // serviceData.append('service_id', this.form.value.service_id);
    serviceData.append('price', this.form.value.price);
    serviceData.append('description', this.form.value.description);
    serviceData.append('mobile', this.form.value.mobile);
    serviceData.append('email', this.form.value.email);
    serviceData.append('website', this.form.value.website);
    serviceData.append('location', this.form.value.location);
    serviceData.append('latitude', this.form.value.latitude);
    serviceData.append('longitude', this.form.value.longitude);

    const endpoint = this.mode === 'update' ? '/updateUserService' : '/createService';

    this.sharedService.postAPI(endpoint, serviceData).subscribe((response: any) => {
      this.isLoadingForm = false;
      if (response?.success === '1') {
        this.toastr.success(response.message);
        this.closeModal();
        this.getList();
      } else {
        this.toastr.error(response?.message || 'Unable to add service');
      }
    });
  }

  onEdit(service: any): void {
    this.mode = 'update';
    this.selectedServiceId = service?.user_service_id || '';
    this.form.patchValue({
      service_id: service?.service_id || '',
      price: service?.price || '',
      description: service?.description || service?.provider_description || '',
      mobile: service?.mobile || '',
      email: service?.email || '',
      website: service?.website || '',
      location: service?.location || '',
      latitude: service?.latitude || '',
      longitude: service?.longitude || ''
    });
  }


}
