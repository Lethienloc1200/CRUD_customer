// import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module NgxPaginationModule
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerModule } from './features/customer-management/customer-module/customer.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './share/header/header.component';
import { MaterialModule } from './share/module/material.module';
import { UserComponent } from './features/user-management/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // CustomerModule,
    HttpClientModule,
    FormsModule,

    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
