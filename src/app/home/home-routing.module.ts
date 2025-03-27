import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthHomeGuard } from '../auth/auth-home.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';




const routes: Routes = [
  {
    path: '',
    children: [
         {
            path: 'home',
            component: HomePageComponent
         },
         {
          path: '',
          component: LoginComponent,
          canActivate: [AuthHomeGuard]
         },
         {
          path: '',
          component: LoginComponent,
          canActivate: [AuthHomeGuard]
         },
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
         }
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
