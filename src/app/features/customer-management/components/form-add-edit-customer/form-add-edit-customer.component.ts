import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CheckDeactivate } from 'src/app/core/guard/check-deactivate';
import { Customer } from 'src/app/features/customer-management/models/customer.class';
import { CustomerService } from 'src/app/features/customer-management/service/customer.service';

@Component({
  selector: 'app-form-add-edit-customer',
  templateUrl: './form-add-edit-customer.component.html',
  styleUrls: ['./form-add-edit-customer.component.scss'],
})
export class FormAddEditCustomerComponent implements OnInit, CheckDeactivate {
  id!: any;
  isEditing = false;

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
    company: ['', [Validators.required, Validators.minLength(2)]],
    image: [''],
  });
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id > 0) {
      this.loadDataToEdit(this.id);
    }
  }
  loadDataToEdit(id: any) {
    this.customerService.getCustomer(id).subscribe((data) => {
      // console.log('edit data:', data);
      for (const controlName in this.customerForm.controls) {
        if (controlName) {
          this.customerForm.controls[controlName].setValue(data[controlName]);
        }
      }
    });
  }
  onSubmit() {
    const newCustomer: any = {}; //khởi tạo object chứa value
    for (const controlName in this.customerForm.controls) {
      if (controlName) {
        newCustomer[controlName] =
          this.customerForm.controls[controlName].value;
      }
    }

    if (this.id > 0) {
      //nếu i> 0 thì Edit
      this.customerService
        .EditCustomer(this.id, newCustomer as Customer)
        .subscribe((data) => {
          console.log('data', data);
        });
      this.isEditing = false;
    } else {
      //nếu i=0 thì Add
      this.customerService
        .addCustomer(newCustomer as Customer)
        .subscribe((data) => {
          console.log('data', data);
        });
    }

    this.router.navigate(['listCustomer']);

    console.log('new customer ', newCustomer);
    console.log('customer2 ', this.customerForm.controls);
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
  checkDeactivate(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.id > 0) {
      this.isEditing = true;
    } else {
      this.isEditing = false;
    }
    console.log('check is Editting:============>', this.isEditing);
    return !this.isEditing || confirm('Bạn có muốn thoát khi chưa lưu');
    // return (
    //   this.customerForm.dirty && confirm('Bạn có muốn thoát khi chưa lưu')
    // );
  }
}
