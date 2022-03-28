import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './shared/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './shared/button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerModule } from './features/customer-management/custome-module/customer.module';
import { UserComponent } from './features/user-management/user/user.component';

//phân chia theo module
//sửa sidenav material
// intercepter guard

@NgModule({
  declarations: [AppComponent, HeaderComponent, ButtonComponent, UserComponent],
  imports: [
    BrowserModule,
    CustomerModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
