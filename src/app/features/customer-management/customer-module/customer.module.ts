import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { DetailCustomerComponent } from '../components/list-customer/detail-customer/detail-customer.component';
import { ListCustomerComponent } from '../components/list-customer/list-customer.component';

import { FormAddEditCustomerComponent } from '../components/form-add-edit-customer/form-add-edit-customer.component';
import {
  AbcGuard,
  CanLeaveEditCustomerGuard,
} from 'src/app/core/guard/abc.guard';
import { Ng2OrderModule } from 'ng2-order-pipe';

const customerModule: Routes = [
  {
    path: '',
    redirectTo: 'listCustomer',
  },
  {
    path: 'listCustomer',
    component: ListCustomerComponent,
    canActivate: [AbcGuard],
  },

  {
    path: 'form-add-edit/:id',
    component: FormAddEditCustomerComponent,
    canDeactivate: [CanLeaveEditCustomerGuard],
    canActivate: [AbcGuard],
  },
  {
    path: 'form-add',
    component: FormAddEditCustomerComponent,
    canDeactivate: [CanLeaveEditCustomerGuard],
    canActivate: [AbcGuard],
  },
  {
    path: 'detail-customer/:id',
    component: DetailCustomerComponent,
  },
];
@NgModule({
  declarations: [
    FormAddEditCustomerComponent,
    DetailCustomerComponent,
    ListCustomerComponent,
  ],
  imports: [
    FormsModule,
    NgxPaginationModule, // <-- include it in your app module
    Ng2OrderModule,
    ReactiveFormsModule,
    CommonModule,
    // BrowserModule,

    RouterModule.forChild(customerModule),
  ],
  exports: [RouterModule],
})
export class CustomerModule {}
