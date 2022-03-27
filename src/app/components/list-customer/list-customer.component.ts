import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, startWith, switchMap, tap } from 'rxjs';
import { Customer } from 'src/app/models/customer.class';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss'],
})
export class ListCustomerComponent implements OnInit {
  public customerList: Customer[] = [];
  queryControl = new FormControl('');
  loading = true;
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  // private loadData() {
  //   this.customerService.getListCustomer().subscribe((data: Customer[]) => {
  //     console.log('data=>cumstomerList', data);
  //     this.customerList = data;
  //   });
  // }

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
        this.customerList = data;
      });
  }

  addCustomer() {
    this.router.navigate(['form-add-edit', 0]);
  }
  editCustomer(customerID: string) {
    this.router.navigate(['form-add-edit', customerID]);
  }
  deleteStudent(customerID: any) {
    this.customerService.deleteCustomer(customerID).subscribe((data) => {
      this.loadData();
    });
  }

  // search(query: string) {
  //   // this.InputText = query;
  //   if (query == '') {
  //     this.loadData();
  //   } else {
  //     console.log(' chek search ', query);
  //     this.customerList = this.customerList.filter((res) => {
  //       console.log(' chek search ', query);
  //       return res.firstName.toLowerCase().includes(query.toLocaleLowerCase());
  //     });
  //   }
  // }
}
