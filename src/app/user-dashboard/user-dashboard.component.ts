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
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private ticketService: TicketService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  search: Ticket[] = [];
  users: Users[] = [];
  tickets: Ticket[] = [];
  singleTicket: number;
  ngOnInit(): void {
    this.getAllUsers();
    this.getAllTicket();
  }
  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  deleteTicket(ticket: Ticket, index: number) {
    this.ticketService
      .deleteTicket(ticket.ticketID)
      .subscribe((data: Ticket) => {
        this.tickets[index] = data;
        this.tickets.splice(index, 1);
      });

    console.log(index);
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: Users[]) => {
        this.users = data;
        console.log(this.users);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  getAllTicket() {
    this.ticketService.getAllTickets().subscribe(
      (data: Ticket[]) => {
        this.tickets = data['data'];
        console.log(this.tickets[0].ticketID);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  filterItems(search: string) {
    this.tickets.length = 0;
    this.ticketService.getAllTickets().subscribe(
      (data: Ticket[]) => {
        this.search = data['data'];
        for (let i = 0; i < this.search.length; i++) {
          if (this.search[i].subject.toLowerCase() === search.toLowerCase()) {
            this.tickets.push(this.search[i]);
          }
        }
        if (!this.searchForm.valid) {
          this.tickets = this.search;
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  modalCreate() {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true
    // dialogConfig.autoFocus = true;
    // dialogConfig.width =  "60%";
    // dialogConfig.panelClass = 'post-dialog-container',
    // this.dialog.open(ModalCreateComponent,dialogConfig);
    this.dialog.open(ModalCreateComponent, {
      width: '60%',
      autoFocus: true,
      disableClose: true,
    });
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
  updateTicket(ticket: Ticket) {
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

    console.log(`from user ${ticket.ticketID}`);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    (dialogConfig.panelClass = 'post-dialog-container'),
      this.dialog.open(UpdateTicketComponent, dialogConfig);
    console.log(`ticket ${ticket}`);
    this.ticketService.getPassTicketValue(ticket);
  }
}
