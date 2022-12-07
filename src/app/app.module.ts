import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

//MaterialShits and http//
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
//End Material Shits and http//

//hot toast//
import { HotToastModule } from '@ngneat/hot-toast';
import { ModalCreateComponent } from './modal-create/modal-create.component';
//end host toast//

import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotComponent } from './forgot/forgot.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { RegisterComponent } from './register/register.component';
import { ClientComponent } from './client/client.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

import { BillingComponent } from './employee/billing/billing.component';
import { CollectionComponent } from './employee/collection/collection.component';
import { TreasuryComponent } from './employee/treasury/treasury.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { NewUserComponent } from './admin/new-user/new-user.component';
import { SalesTeamNavbarComponent } from './employee/sales-team/sales-team-navbar/sales-team-navbar.component';
import { SalesTeamDashboardComponent } from './employee/sales-team/sales-team-dashboard/sales-team-dashboard.component';
import { ConfirmSlipComponent } from './employee/sales-team/confirm-slip/confirm-slip.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashboardComponent,
    CreateTicketComponent,
    UpdateTicketComponent,
    NavbarComponent,
    ModalCreateComponent,
    ForgotComponent,
    EditTicketComponent,
    RegisterComponent,
    ClientComponent,
    AdminLoginComponent,
    AdminDashboardComponent,

    BillingComponent,
    CollectionComponent,
    TreasuryComponent,
    AdminNavbarComponent,
    NewUserComponent,
    SalesTeamNavbarComponent,
    SalesTeamDashboardComponent,
    ConfirmSlipComponent,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    HotToastModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
