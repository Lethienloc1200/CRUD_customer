import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormAddEditCustomerComponent } from '../components/form-add-edit-customer/form-add-edit-customer.component';
import { DetailCustomerComponent } from '../components/list-customer/detail-customer/detail-customer.component';
import {
  AbcGuard,
  CanLeaveEditCustomerGuard,
} from 'src/app/core/guard/abc.guard';
import { ListCustomerComponent } from '../components/list-customer/list-customer.component';
const customerRoutes: Routes = [
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
  declarations: [
    ListCustomerComponent,
    FormAddEditCustomerComponent,
    DetailCustomerComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(customerRoutes)],
})
export class CustomerModule {}
