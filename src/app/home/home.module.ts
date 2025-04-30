import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HowWorkComponent } from './how-work/how-work.component';
import { OurProductsComponent } from './our-products/our-products.component';
import { FaqComponent } from './faq/faq.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { GetUserDetailComponent } from './get-user-detail/get-user-detail.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NewUserInfoComponent } from './new-user-info/new-user-info.component';
import { CoOpComponent } from './co-op/co-op.component';
import { SharedFaqComponent } from './shared-faq/shared-faq.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { HomePrivacyComponent } from './home-privacy/home-privacy.component';
import { HomeTermsComponent } from './home-terms/home-terms.component';




@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    CarouselModule
  ],
  declarations: [
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    VerifyUserComponent,
    RegisterUserComponent,
    LandingPageComponent,
    HomeHeaderComponent,
    AboutUsComponent,
    HowWorkComponent,
    OurProductsComponent,
    FaqComponent,
    GetUserDetailComponent,
    ContactUsComponent,
    NewUserInfoComponent,
    CoOpComponent,
    SharedFaqComponent,
    HomeFooterComponent,
    HomePrivacyComponent,
    HomeTermsComponent
  ],
  providers: [
  ],
  exports: [],
})


export class HomeModule { }
