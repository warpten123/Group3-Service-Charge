import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalCreateComponent } from 'src/app/modal-create/modal-create.component';
import { Ticket } from 'src/app/services/ticket/ticket-interface';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Users } from 'src/app/services/users/user-interface';
import { UsersService } from 'src/app/services/users/users.service';
import { UpdateTicketComponent } from 'src/app/update-ticket/update-ticket.component';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'username', 'email'];
  dataSource: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private userService: UsersService,
    private ticketService: TicketService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  newDate: any;
  search: Ticket[] = [];
  users: Users[] = [];
  tickets: Ticket[] = [];
  singleTicket: number;
  clientAccount: Users[] = [];
  finalClientAccount: Users[] = [];

  employeeAccount: Users[] = [];
  finalEmployeeAccount: Users[] = [];

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllTicket();
    this.getAllClients();
    this.dataSource = new MatTableDataSource(this.users);
  }
  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', Validators.required),
  });
  getAllClients() {
    this.userService.getAllUsers().subscribe((data: Users[]) => {
      this.clientAccount = data['data'];
      for (let i = 0; i < data['data'].length; i++) {
        if (this.clientAccount[i].roles == 'Client') {
          this.finalClientAccount.push(this.clientAccount[i]);
        } else if (this.clientAccount[i].roles != 'Client') {
          if (this.clientAccount[i].roles != 'Admin') {
            this.finalEmployeeAccount.push(this.clientAccount[i]);
          }
        }
      }
    });
  }
  deleteTicket(ticket: Ticket, index: number) {
    this.ticketService
      .deleteTicket(ticket.ticketID)
      .subscribe((data: Ticket) => {
        this.tickets[index] = data;
        this.tickets.splice(index, 1);
      });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: Users[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  getAllTicket() {
    this.ticketService.getAllTickets().subscribe(
      (data: Ticket[]) => {
        for (let i = 0; i < data['data'].length; i++) {
          this.tickets = data['data'];
          // this.tickets[i].created_at = moment().format('YYYY-MM-DD');
        }
        const currentDay = moment();
        // const createdDate = moment(this.tickets[0].created_at);
        // const diff = createdDate.diff(currentDay, 'days');
        // console.log(diff);

        // const diff = rentalDate.diff(currentDay, 'days');
        // const finalDate = moment(currentDay);
        // let date = moment(test, 'YYYY-MM-DD').format('MMMM Do YYYY, h:mm:ss a');
        console.log(currentDay.toString());
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

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    (dialogConfig.panelClass = 'post-dialog-container'),
      this.dialog.open(UpdateTicketComponent, dialogConfig);

    this.ticketService.getPassTicketValue(ticket);
  }
  checkForAgingTicket(ticket: Ticket) {
    //Sun Dec 04 2022 21:40:33 GMT+0800
    console.log(ticket.created_at);
    let cont: boolean = false;
    const currentDay = moment();
    const createdAt = moment(ticket.created_at);
    const diff = createdAt.diff(currentDay, 'days');
    console.log(diff);
    if (Math.abs(diff) > 7) {
      cont = true;
    } else cont = false;
    return cont;
  }
}
