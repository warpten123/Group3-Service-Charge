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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
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
    ClientComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
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
    HotToastModule.forRoot(),
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
