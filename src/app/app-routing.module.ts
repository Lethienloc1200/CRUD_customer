import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormAddEditCustomerComponent } from './components/form-add-edit-customer/form-add-edit-customer.component';
import { DetailCustomerComponent } from './components/list-customer/detail-customer/detail-customer.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { AbcGuard, CanLeaveEditCustomerGuard } from './guard/abc.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listCustomer',
    pathMatch: 'full',
  },
  {
    path: 'listCustomer',
    component: ListCustomerComponent,
  },
  {
    path: 'form-add-edit/:id',
    component: FormAddEditCustomerComponent,
    canDeactivate: [CanLeaveEditCustomerGuard],
  },
  {
    path: 'detail-customer/:id',
    component: DetailCustomerComponent,
    canActivate: [AbcGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
