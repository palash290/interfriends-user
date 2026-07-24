import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css']
})
export class AllServicesComponent implements OnInit {

  userId: any;
  isLoading = true;
  isLoader = true;
  serviceList: any[] = [];
  selectedService: any = null;
  totalServices = 0;
  servicesPerPage = 10;
  currentPage = 0;
  selectedServiceImages: Array<{ id: string | number | null; name: string; url: string }> = [];
  previewImageUrl = '';
  previewImageName = '';



  constructor(public authService: AuthService,
    public sharedService: SharedService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.isLoader = true;
    this.getList();
  }

  getList(showLoader = true) {
    if (showLoader) {
      this.isLoader = true;
    }
    const start = (this.servicesPerPage * this.currentPage).toString();
    const formUrlData = new FormData();
    formUrlData.append('start', start);
    formUrlData.append('user_id', this.userId);
    formUrlData.append('search', this.search);

    // this.isLoader = true;
    this.sharedService.postAPI('/getAllServices', formUrlData)
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

        this.totalServices = response?.totalCount;

      });
  }

  search = '';

  onSearchChange(): void {
    this.currentPage = 0;
    this.getList(false);
  }

  onChangedPage(pageData: PageEvent): any {
    // this.isLoadingPage = true;
    this.currentPage = pageData.pageIndex;
    this.servicesPerPage = pageData.pageSize;
    this.getList();
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

  viewServiceDetails(service: any) {
    this.selectedService = service;
    this.selectedServiceImages = this.buildExistingImages(service);
  }

  openImagePreview(image: { url: string; name?: string }): void {
    this.previewImageUrl = image?.url || '';
    this.previewImageName = image?.name || 'Service image';
  }

  closeImagePreview(): void {
    this.previewImageUrl = '';
    this.previewImageName = '';
  }


}
