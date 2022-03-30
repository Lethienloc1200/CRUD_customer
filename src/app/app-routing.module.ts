import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './features/user-management/user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'list',
    loadChildren: () =>
      import(
        './features/customer-management/customer-module/customer.module'
      ).then((m) => m.CustomerModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
