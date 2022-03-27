import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FormAddEditCustomerComponent } from '../components/form-add-edit-customer/form-add-edit-customer.component';
import { CustomerService } from '../service/customer.service';
import { CheckDeactivate } from './check-deactivate';

@Injectable({
  providedIn: 'root',
})
export class AbcGuard implements CanActivate {
  constructor(private customerService: CustomerService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.customerService.currentUser == 'LocLT8';
  }
}
@Injectable({
  providedIn: 'root',
})
export class CanLeaveEditCustomerGuard
  implements CanDeactivate<CheckDeactivate>
{
  canDeactivate(
    component: CheckDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.checkDeactivate(currentRoute, currentState, nextState);
  }
}
