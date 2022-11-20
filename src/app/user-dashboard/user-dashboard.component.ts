import { UpdateTicketComponent } from './../update-ticket/update-ticket.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketService } from './../services/ticket/ticket.service';

import { UsersService } from './../services/users/users.service';
import { Users } from './../services/users/user-interface';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../services/ticket/ticket-interface';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { Router } from '@angular/router';

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
    private router: Router,
    ) { }

  users: Users[]=[];
  tickets: Ticket[]=[];
  singleTicket: number;
  ngOnInit(): void {
   this.getAllUsers();
   this.getAllTicket();
  }

  deleteTicket(ticket: Ticket, index: number){
    this.ticketService.deleteTicket(ticket.ticket_id).subscribe((data: Ticket) => {
      this.tickets[index]=data;
      this.tickets.splice(index,1);
    })
    
    
    console.log(index);
  }
 
  getAllUsers(){
    this.userService.getAllUsers().subscribe((data: Users[])=>{this.users=data;
      console.log(this.users);},(error: any)=>{
        console.error(error);
      }
      ); 
  }
  getAllTicket(){
    this.ticketService.getAllTickets().subscribe((data: Ticket[])=>{this.tickets=data["data"];
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
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
  updateTicket(ticket: Ticket){
  //   const payload: Ticket = {
  //     assignee: "asd",
  //     tracker: "3test",
  //     description: "5",
  //     subject: "6",
  //     status: "Resolved",
  //   };
  //   this.ticketService.updateTicket(ticket_id,payload).subscribe((data: number)=>{
  //     this.singleTicket = data;
  //     this.getAllTicket();
  //   });
  // 
    
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true;
    dialogConfig.width =  "60%";
    dialogConfig.panelClass = 'post-dialog-container',
    this.dialog.open(UpdateTicketComponent,dialogConfig);
    console.log(`ticket ${ticket}`);
    this.ticketService.getPassTicketValue(ticket);
}
}
