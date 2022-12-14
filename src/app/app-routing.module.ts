import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminMonthlyComponent } from './admin/admin-monthly/admin-monthly.component';
import { AdminRegisterComponent } from './admin/admin-register/admin-register.component';
import { ClientAgingComponent } from './client/client-aging/client-aging.component';
import { ClientResolvedComponent } from './client/client-resolved/client-resolved.component';
import { ClientComponent } from './client/client_dashboard/client.component';
import { EmployeeLoginComponent } from './employee/employee-login/employee-login.component';
import { SalesTeamDashboardComponent } from './employee/sales-team/sales-team-dashboard/sales-team-dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'client',
    component: ClientComponent,
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent,
  },
  {
    path: 'employee-login',
    component: EmployeeLoginComponent,
  },
  {
    path: 'admin-register',
    component: AdminRegisterComponent,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: 'client-dashboard',
    component: ClientComponent,
  },
  {
    path: 'sales',
    component: SalesTeamDashboardComponent,
  },
  {
    path: 'client-aging',
    component: ClientAgingComponent,
  },
  {
    path: 'client-resolved',
    component: ClientResolvedComponent,
  },
  {
    path: 'admin-resolved',
    component: AdminMonthlyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
