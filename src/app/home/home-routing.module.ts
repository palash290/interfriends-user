import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthHomeGuard } from '../auth/auth-home.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HowWorkComponent } from './how-work/how-work.component';
import { OurProductsComponent } from './our-products/our-products.component';
import { FaqComponent } from './faq/faq.component';
import { GetUserDetailComponent } from './get-user-detail/get-user-detail.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CoOpComponent } from './co-op/co-op.component';
import { HomePrivacyComponent } from './home-privacy/home-privacy.component';
import { HomeTermsComponent } from './home-terms/home-terms.component';




const routes: Routes = [
  {
    path: '',
    children: [
      //  {
      //     path: 'home',
      //     component: HomePageComponent
      //  },
      {
        path: 'home',
        component: LandingPageComponent
      },
      {
        path: '',
        component: LoginComponent,
        canActivate: [AuthHomeGuard]
      },
      //  {
      //   path: '',
      //   component: LoginComponent,
      //   canActivate: [AuthHomeGuard]
      //  },
      {
        path: 'register',
        component: RegisterUserComponent,
      },
      {
        path: 'resetPassword/:token',
        component: ResetPasswordComponent,
        canActivate: [AuthHomeGuard]
      },
      {
        path: 'verifyUser/:token',
        component: VerifyUserComponent,
        canActivate: [AuthHomeGuard]
      },
      {
        path: 'forgotPassword',
        component: ForgotPasswordComponent,
        canActivate: [AuthHomeGuard]
      },

      {
        path: 'about-us',
        component: AboutUsComponent,
        canActivate: [AuthHomeGuard]
      },
      {
        path: 'how-it-works',
        component: HowWorkComponent,
        canActivate: [AuthHomeGuard]
      },
      {
        path: 'our-products',
        component: OurProductsComponent,
        canActivate: [AuthHomeGuard]
      },
      {
        path: 'faq',
        component: FaqComponent,
        canActivate: [AuthHomeGuard]
      },
      {
        path: 'user-details',
        component: GetUserDetailComponent,
        canActivate: [AuthHomeGuard]
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        canActivate: [AuthHomeGuard]
      },
      {
        path: 'co-operative',
        component: CoOpComponent,
        canActivate: [AuthHomeGuard]
      },

      {
        path: 'privacyPolicy',
        component: HomePrivacyComponent,
        canActivate: [AuthHomeGuard]
      },
      {
        path: 'term&condition',
        component: HomeTermsComponent,
        canActivate: [AuthHomeGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthHomeGuard
  ]
})
export class HomeRoutingModule { }
