import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../../models/customer.class';
import { CustomerService } from '../../../service/customer.service';
// import { Customer } from 'src/app/models/customer.class';
// import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss'],
})
export class DetailCustomerComponent implements OnInit {
  id: any = 0;

  public customer!: Customer;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id > 0) {
      this.loadDataInfor(this.id);
    }
  }
  loadDataInfor(id: any) {
    this.customerService.getCustomer(id).subscribe((data) => {
      this.customer = data;
      console.log('detailInfor', this.customer);
    });
  }
}
