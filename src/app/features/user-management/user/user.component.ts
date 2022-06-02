import { Component, OnInit, DoCheck, Injectable } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../customer-management/service/customer.service';
import { Location } from '@angular/common';
import { Login } from '../../customer-management/models/login.class';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class UserComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) {}

  showFiller = false;
  id: any;
  currentUser: any;
  dataLogin: any;
  dataRegister: any;
  loginForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(5)]],
    passUserDemo: ['', [Validators.required, Validators.minLength(2)]],
  });

  onRegister() {
    const newUser = this.loginForm.getRawValue();
    // console.log('new User', newUser);
    this.customerService.getUserLogin().subscribe((data) => {
      this.dataRegister = data;
      if (
        this.dataRegister.filter(
          (item: { userName: any }) => item.userName === newUser.userName
        ).length > 0
      ) {
        alert('Tên đăng nhập đã tồn tại');
      } else {
        alert('Đăng ký thành công');
        this.customerService
          .registerUser(newUser as Login)
          .subscribe((data) => {});
        this.loginForm.reset();
      }
    });
  }

  login() {
    const newUser = this.loginForm.getRawValue();
    // console.log('new User', newUser);
    this.customerService.getUserLogin().subscribe((data) => {
      console.log('data get', data);
      console.log('new user get', newUser);

      this.dataLogin = data;
      if (
        this.dataLogin.filter(
          (item: { passUserDemo: any; userName: any }) =>
            item.userName === newUser.userName &&
            item.passUserDemo === newUser.passUserDemo
        ).length > 0
      ) {
        this.currentUser = newUser.userName;
        alert('Đăng nhập thành công');

        console.log('currentUser', this.currentUser);
        this.router.navigate(['/list/listCustomer']);
      } else {
        alert('Tài khoản hoặc mật khẩu không đúng');
      }
    });
  }

  ngOnInit(): void {}
  get userName() {
    return this.loginForm.get('userName');
  }
  get passUserDemo() {
    return this.loginForm.get('passUserDemo');
  }
}
