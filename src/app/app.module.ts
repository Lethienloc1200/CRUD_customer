import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormAddEditCustomerComponent } from './components/form-add-edit-customer/form-add-edit-customer.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { DetailCustomerComponent } from './components/list-customer/detail-customer/detail-customer.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormAddEditCustomerComponent,
    ListCustomerComponent,
    DetailCustomerComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
