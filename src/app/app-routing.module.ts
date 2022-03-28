import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCustomerComponent } from './features/customer-management/components/list-customer/list-customer.component';
import { UserComponent } from './features/user-management/user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: UserComponent,
  },

  // {
  //   path: '',
  //   loadChildren: () =>
  //     import(
  //       './features/customer-management/custome-module/customer.module'
  //     ).then((m) => m.CustomerModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
