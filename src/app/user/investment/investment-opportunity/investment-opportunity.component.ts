import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/model/property.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-investment-opportunity',
  templateUrl: './investment-opportunity.component.html',
  styleUrls: ['./investment-opportunity.component.css']
})
export class InvestmentOpportunityComponent implements OnInit {
  lists: Property[] = [];
  userId: string;
  groupId: string;
  isLoading  = true;

  pageLimit: number;
  notEmptyPost = true;
  notscrolly = true;
  isLoader = true;


  selectedId: string;
  eachChange: string;


  constructor(
    public uerService: UserService,
    public authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.groupId = this.authService.getgroupId();
    this.pageLimit = 0;
    this.notEmptyPost = true;
    this.notscrolly = true;
    this.isLoader = true;
    this.loadInitList();
  }


  // list code start

  loadInitList() {
    this.isLoader = true;
    this.pageLimit = 0;
    this.uerService.propertyList(
      this.pageLimit
      ).subscribe((response: any) => {
        this.isLoader = false;
        this.isLoading = false;
        this.spinner.hide();
        if (response.lists.length === 0 ) {
          this.notEmptyPost =  false;
        }

        for (const value of response.lists) {
          this.lists.push(value);
        }
        console.log(this.lists)

        this.notscrolly = true;
     });
  }


  loadNextList() {
      this.pageLimit += 8;
      this.uerService.propertyList(
        this.pageLimit
        ).subscribe((response: any) => {
          this.spinner.hide();
          if (response.lists.length === 0 ) {
            this.notEmptyPost =  false;
          }

          for (const value of response.lists) {
            this.lists.push(value);
          }

          this.notscrolly = true;
      });
  }

  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      this.spinner.show();
      this.notscrolly = false;
      this.loadNextList();
     }
   }

  // list code end


  onShowImage(index: number, id: string) {
    this.uerService.propertyImage(id).subscribe((response: any) => {
      this.lists[index].background_image = response.property_image;
      this.lists[index].more_image_status = true;
    });
  }

  setShowImage(index: number, image: string) {
      this.lists[index].show_property_image = image;
  }


  onSelectId(id: string): void {
    this.selectedId = id;
    this.eachChange = Math.random().toString();
  }

}
