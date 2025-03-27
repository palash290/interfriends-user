import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthUserGuard } from '../auth/auth-user.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmergencyLoanListComponent } from './emergency-loan/emergency-loan-list/emergency-loan-list.component';
import { InvestmentListComponent } from './investment/investment-list/investment-list.component';
import { InvestmentOpportunityComponent } from './investment/investment-opportunity/investment-opportunity.component';
import { InvestmentProfitComponent } from './investment/investment-profit/investment-profit.component';
import { ApplyLoanComponent } from './loan/apply-loan/apply-loan.component';
import { MyLoansComponent } from './loan/my-loans/my-loans.component';
import { PfListComponent } from './pf-list/pf-list.component';
import { RecommendUserComponent } from './recommend-user/recommend-user.component';
import { SafeKeepingListComponent } from './safe-keeping/safe-keeping-list/safe-keeping-list.component';
import { SavingDetailComponent } from './saving/saving-detail/saving-detail.component';
import { ImageMagnifyPageComponent } from './test/image-magnify-page/image-magnify-page.component';
import { UserProfileComponent } from './userInfo/user-profile/user-profile.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { ProgessBarComponent } from './progess-bar/progess-bar.component';
import { DonutChartComponent } from './chart/donut-chart/donut-chart.component';
import { HelpComponent } from './help/help.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ChangeUserPasswordComponent } from './change-user-password/change-user-password.component';
import { MiscellaneousListComponent } from './miscellaneous/miscellaneous-list/miscellaneous-list.component';
import { TermandconditionComponent } from './termandcondition/termandcondition.component';
import { PrivacyPolicyComponent } from './layout/privacy-policy/privacy-policy.component';
import { WelfareLoanComponent } from './loan/welfare-loan/welfare-loan.component';
import { HelptobuyLayoutComponent } from './helptobuy-layout/helptobuy-layout.component';
import { Help2buyLoanlistComponent } from './helptobuy-layout/help2buy-loanlist/help2buy-loanlist.component';



const routes: Routes = [
  {
    path: '',
    children: [
         {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [AuthUserGuard]
         },
         {
          path: 'myLoans',
          component: MyLoansComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'applyLoan',
          component: ApplyLoanComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'term&condition',
          component: TermandconditionComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'savingDetail',
          component: SavingDetailComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'JNRsavingDetail/:lifeCycleType',
          component: SavingDetailComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'PFsavingDetails/:fromPF',
          component: SavingDetailComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'HepToBuysavingDetail/:lifeCycleType',
          component: SavingDetailComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'userProfile',
          component: UserProfileComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'pfList',
          component: PfListComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'safeKeepingList',
          component: SafeKeepingListComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'emergencyLoanList',
          component: EmergencyLoanListComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'miscellaneousList',
          component: MiscellaneousListComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'recommendUser',
          component: RecommendUserComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'investmentList',
          component: InvestmentListComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'investmentProfit',
          component: InvestmentProfitComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'investmentOpportunity',
          component: InvestmentOpportunityComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'imageMagnifyPage',
          component: ImageMagnifyPageComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'notificationList',
          component: NotificationListComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'progessBar',
          component: ProgessBarComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'donutChart',
          component: DonutChartComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'help',
          component: HelpComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'contactUs',
          component: ContactUsComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'changePassword',
          component: ChangeUserPasswordComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path: 'privacyPolicy',
          component: PrivacyPolicyComponent,
          canActivate: [AuthUserGuard]
         },
         {
          path : 'welfareLoan',
          component : WelfareLoanComponent,
          canActivate: [AuthUserGuard]
         },
         {
           path : 'help2buylayout/:groupId/:userId',
           component : HelptobuyLayoutComponent,
           canActivate: [AuthUserGuard]
         },
         {
          path : 'help2buyloanlist/:loanType',
          component : Help2buyLoanlistComponent,
          canActivate: [AuthUserGuard]
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthUserGuard
  ]
})
export class UserRoutingModule { }
