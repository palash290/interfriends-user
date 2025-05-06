import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ApprovalPageComponent } from './user/approval-page/approval-page.component';
import { DeclinePageComponent } from './user/decline-page/decline-page.component';

const routes: Routes = [
  {  path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {  path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'handleApproval/:token/:id',
    component: ApprovalPageComponent,
  },
  {
    path: 'handleDecline/:token/:id',
    component: DeclinePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
