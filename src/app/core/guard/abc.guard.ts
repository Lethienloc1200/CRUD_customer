import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/features/customer-management/service/customer.service';
import { UserComponent } from 'src/app/features/user-management/user/user.component';

import { CheckDeactivate } from './check-deactivate';

@Injectable({
  providedIn: 'root',
})
export class AbcGuard implements CanActivate {
  constructor(
    private customerService: CustomerService,
    private user: UserComponent
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.user.currentUser == null;
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
