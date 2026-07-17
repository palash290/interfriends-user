import { Component, OnInit } from '@angular/core';
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


  constructor(public authService: AuthService,
    public sharedService: SharedService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.isLoader = true;
    this.getList();
  }

  getList() {
    const formUrlData = new FormData();
    formUrlData.set('user_id', this.userId);
    this.isLoader = true;
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
      });
  }

    viewServiceDetails(service: any) {
    this.selectedService = service;
  }


}
