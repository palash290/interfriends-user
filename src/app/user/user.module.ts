import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { DateAgoPipe } from '../pipe/dateAgo.pipe';


//third party
import { ImageCropperModule } from 'ngx-image-cropper';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyLoansComponent } from './loan/my-loans/my-loans.component';
import { SubMenuComponent } from './layout/sub-menu/sub-menu.component';
import { MobileMenuComponent } from './layout/mobile-menu/mobile-menu.component';
import { ApplyLoanComponent } from './loan/apply-loan/apply-loan.component';
import { AddLoanRequestComponent } from './loan/add-loan-request/add-loan-request.component';
import { SavingPageComponent } from './saving/saving-page/saving-page.component';
import { PayoutPageComponent } from './saving/payout-page/payout-page.component';
import { SavingDetailComponent } from './saving/saving-detail/saving-detail.component';
import { UserProfileComponent } from './userInfo/user-profile/user-profile.component';
import { PfListComponent } from './pf-list/pf-list.component';
import { SafeKeepingListComponent } from './safe-keeping/safe-keeping-list/safe-keeping-list.component';
import { AddSafeKeepingRequestComponent } from './safe-keeping/add-safe-keeping-request/add-safe-keeping-request.component';
import { EmergencyLoanListComponent } from './emergency-loan/emergency-loan-list/emergency-loan-list.component';
import { EmergencyLoanRequestComponent } from './emergency-loan/emergency-loan-request/emergency-loan-request.component';
import { RecommendUserComponent } from './recommend-user/recommend-user.component';
import { InvestmentListComponent } from './investment/investment-list/investment-list.component';
import { InvestmentOpportunityComponent } from './investment/investment-opportunity/investment-opportunity.component';
import { InvestmentProfitComponent } from './investment/investment-profit/investment-profit.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ImageMagnifyPageComponent } from './test/image-magnify-page/image-magnify-page.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotificationListComponent } from './notification-list/notification-list.component';


import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProgessBarComponent } from './progess-bar/progess-bar.component';
import { ChartsModule } from 'ng2-charts';
import { DonutChartComponent } from './chart/donut-chart/donut-chart.component';
import { GaugeModule } from 'angular-gauge';
import { HelpComponent } from './help/help.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactInvestmentComponent } from './investment/contact-investment/contact-investment.component';
import { ChangeUserPasswordComponent } from './change-user-password/change-user-password.component';
import { MiscellaneousListComponent } from './miscellaneous/miscellaneous-list/miscellaneous-list.component';
import { BlockUserComponent } from './block-user/block-user.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TermandconditionComponent } from './termandcondition/termandcondition.component';
import { PrivacyPolicyComponent } from './layout/privacy-policy/privacy-policy.component';
import { WelfareLoanComponent } from './loan/welfare-loan/welfare-loan.component';
import { HelptobuyLayoutComponent } from './helptobuy-layout/helptobuy-layout.component';
import { Help2buyLoanlistComponent } from './helptobuy-layout/help2buy-loanlist/help2buy-loanlist.component';





@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ImageCropperModule,
    GoogleMapsModule,
    CKEditorModule,
    NgbModule,
    NgxImageZoomModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgCircleProgressModule.forRoot({
      "backgroundPadding": 1,
      "radius": 90,
      "outerStrokeWidth": 36,
      "outerStrokeColor": "#f2994a",
      "outerStrokeLinecap": "square",
      "innerStrokeColor": "#c76d1a",
      "imageHeight": 87,
      "imageWidth": 99,
      "responsive": true}),
    ChartsModule,
    GaugeModule.forRoot()
  ],
  declarations: [
  DashboardComponent,
  HeaderComponent,
  FooterComponent,
  MyLoansComponent,
  SubMenuComponent,
  MobileMenuComponent,
  ApplyLoanComponent,
  AddLoanRequestComponent,
  SavingPageComponent,
  PayoutPageComponent,
  SavingDetailComponent,
  UserProfileComponent,
  PfListComponent,
  SafeKeepingListComponent,
  AddSafeKeepingRequestComponent,
  EmergencyLoanListComponent,
  EmergencyLoanRequestComponent,
  RecommendUserComponent,
  InvestmentListComponent,
  InvestmentOpportunityComponent,
  InvestmentProfitComponent,
  ImageMagnifyPageComponent,
  NotificationListComponent,
  DateAgoPipe,
  ProgessBarComponent,
  DonutChartComponent,
  HelpComponent,
  ContactUsComponent,
  ContactInvestmentComponent,
  ChangeUserPasswordComponent,
  MiscellaneousListComponent,
  BlockUserComponent,
  TermandconditionComponent,
  PrivacyPolicyComponent,
  WelfareLoanComponent,
  HelptobuyLayoutComponent,
  Help2buyLoanlistComponent,
  ],
  providers: [],
  exports: [],
})


export class UserModule { }
