import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
// import { Location } from '@angular/common';
import { Location } from '@angular/common';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CheckDeactivate } from 'src/app/core/guard/check-deactivate';
import { Customer } from '../../models/customer.class';
import { CustomerService } from '../../service/customer.service';
// import { CheckDeactivate } from 'src/app/guard/check-deactivate';
// import { Customer } from 'src/app/models/customer.class';
// import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-form-add-edit-customer',
  templateUrl: './form-add-edit-customer.component.html',
  styleUrls: ['./form-add-edit-customer.component.scss'],
})
export class FormAddEditCustomerComponent implements OnInit, CheckDeactivate {
  id: any;

  customerForm = this.formBuilder.group({
    code: ['', [Validators.required, Validators.minLength(5)]],
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    gender: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    email: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          '^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$'
        ),
      ],
    ],
    address: ['', [Validators.required, Validators.minLength(6)]],
    addressDetail: this.initFormAddress(),
    company: ['', [Validators.required, Validators.minLength(2)]],
    image: [''],
  });
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loadDataToEdit(this.id);
    }
    this.code?.valueChanges.subscribe((data) => {
      if (data) {
        this.customerForm.get('image')?.setValidators(Validators.required);
      } else {
        this.customerForm.get('image')?.setValidators(null);
      }
      this.customerForm.get('image')?.updateValueAndValidity();
    });
    console.log('check=>this.customerForm', this.customerForm);
    console.log(
      'check=>this.customerForm.markAsPristine()',
      this.customerForm.markAsPristine()
    );
  }

  initFormAddress() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      number: ['', [Validators.required, Validators.minLength(2)]],
      something: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  loadDataToEdit(id: any) {
    this.customerService.getCustomer(id).subscribe((data) => {
      this.customerForm.patchValue(data);
    });
  }

  back() {
    this.location.back();
  }
  onSubmit() {
    const newCustomer = this.customerForm.getRawValue();

    if (this.id > 0) {
      //nếu i> 0 thì Edit
      this.customerService
        .EditCustomer(this.id, newCustomer as Customer)
        .subscribe((data) => {
          this.customerForm.markAsPristine();
          console.log('data', data);
        });
    } else {
      //nếu i=0 thì Add
      this.customerService
        .addCustomer(newCustomer as Customer)
        .subscribe((data) => {
          this.customerForm.markAsPristine();
          console.log('data', data);
        });
    }

    this.router.navigate(['list/listCustomer']);

    // console.log('new customer ', newCustomer);
    // console.log('customer2 ', this.customerForm.controls);
  }
  get firstName() {
    return this.customerForm.get('firstName');
  }
  get lastName() {
    return this.customerForm.get('lastName');
  }
  get code() {
    return this.customerForm.get('code');
  }
  get address() {
    return this.customerForm.get('address');
  }
  get gender() {
    return this.customerForm.get('gender');
  }
  get email() {
    return this.customerForm.get('email');
  }
  get phone() {
    return this.customerForm.get('phone');
  }
  get company() {
    return this.customerForm.get('company');
  }
  get image() {
    return this.customerForm.get('image');
  }
  get addressDetail() {
    return this.customerForm.get('addressDetail');
  }
  get number() {
    return this.customerForm.get('addressDetail.number');
  }
  get something() {
    return this.customerForm.get('addressDetail.something');
  }
  checkDeactivate(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if (this.id > 0) {
    //   this.isEditing = true;
    // } else {
    //   this.isEditing = false;
    // }
    // console.log('check is Editting:============>', this.isEditing);

    // return !this.isEditing || confirm('Bạn có muốn thoát khi chưa lưu');
    if (this.customerForm.dirty) {
      return confirm('Bạn có muốn thoát khi chưa lưu');
    }
    return true;
  }
}
