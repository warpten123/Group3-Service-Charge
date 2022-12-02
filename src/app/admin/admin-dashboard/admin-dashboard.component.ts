import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalCreateComponent } from 'src/app/modal-create/modal-create.component';
import { Ticket } from 'src/app/services/ticket/ticket-interface';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Users } from 'src/app/services/users/user-interface';
import { UsersService } from 'src/app/services/users/users.service';
import { UpdateTicketComponent } from 'src/app/update-ticket/update-ticket.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
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
          console.log(
            this.search[i].assignee +
              ' ' +
              this.search[i].assignee.includes(search)
          );
          if (this.search[i].subject.includes(search)) {
            this.tickets.push(this.search[i]);
          } else if (this.search[i].assignee.includes(search)) {
            this.tickets.push(this.search[i]);
          } else if (this.search[i].status.includes(search)) {
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
