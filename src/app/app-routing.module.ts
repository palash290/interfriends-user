import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PrivacyPolicyComponent } from './user/layout/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {  path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {  path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
