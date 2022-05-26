import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, startWith, switchMap, tap } from 'rxjs';
import { Customer } from '../../models/customer.class';

import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss'],
})
export class ListCustomerComponent implements OnInit {
  public customerList: Customer[] = [];
  totalLength!: any;
  page: number = 1;
  queryControl = new FormControl('');
  loading = true;
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.queryControl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.loading = true;
        }),
        startWith(''),
        switchMap((query) =>
          this.customerService.getListCustomer(query).pipe(
            tap(() => {
              this.loading = false;
            })
          )
        )
      )
      .subscribe((data) => {
        this.customerList = data.map((record) => new Customer(record));
        this.totalLength = data.length;
        // console.log('CHECK===========> totalLength=>', this.totalLength);
        console.log('CHECK===========> data=>', this.customerList);
      });
  }

  addCustomer() {
    this.router.navigate(['list/form-add']);
  }
  editCustomer(customerID: string) {
    this.router.navigate(['list/form-add-edit', customerID]);
  }
  deleteStudent(customerID: any) {
    this.customerService.deleteCustomer(customerID).subscribe((data) => {
      this.loadData();
    });
  }

  //sort
  key = 'id';
  reverse: boolean = false; //đảo ngược
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
