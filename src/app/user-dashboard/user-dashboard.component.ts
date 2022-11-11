import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketService } from './../services/ticket/ticket.service';

import { UsersService } from './../services/users/users.service';
import { Users } from './../services/users/user-interface';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../services/ticket/ticket-interface';
import { ModalCreateComponent } from '../modal-create/modal-create.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private ticketService: TicketService,
    private dialog: MatDialog,
    ) { }

  users: Users[]=[];
  tickets: Ticket[]=[];
  ngOnInit(): void {
   this.getAllUsers();
   this.getAllTicket();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((data: Users[])=>{this.users=data;
      console.log(this.users);},(error: any)=>{
        console.error(error);
      }
      ); 
  }
  getAllTicket(){
    this.ticketService.getAllTickets().subscribe((data: Ticket[])=>{this.tickets=data;
      console.log(this.tickets);},(error: any)=>{
        console.error(error);
      }
      ); 
  }
  modalCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true;
    dialogConfig.width =  "60%";
    dialogConfig.panelClass = 'post-dialog-container',
    this.dialog.open(ModalCreateComponent,dialogConfig);
    this.getAllTicket();
  }
}
