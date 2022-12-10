import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Reports } from 'src/app/services/reports/reports';
import { Ticket } from 'src/app/services/ticket/ticket-interface';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Users } from 'src/app/services/users/user-interface';
import { UsersService } from 'src/app/services/users/users.service';
import * as moment from 'moment';
@Component({
  selector: 'app-admin-monthly',
  templateUrl: './admin-monthly.component.html',
  styleUrls: ['./admin-monthly.component.css'],
})
export class AdminMonthlyComponent implements OnInit {
  reports: Reports = {
    totalActive: 0,
    totalAging: 0,
    totalClients: 0,
    totalEmployees: 0,
    totalResolved: 0,
    totalTickets: 0,
  };

  tickets: Ticket[] = [];
  users: Users[] = [];
  totalUsers?: number = 0;
  totalClients?: number = 0;
  totalEmployees?: number = 0;
  totalTickets?: number = 0;
  totalActive?: number = 0;
  totalResolved?: number = 0;
  totalAging?: number = 0;
  constructor(
    private userService: UsersService,
    private ticketService: TicketService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.reports.totalAging = 0;
    // this.reports.totalActive = 0;
    // this.reports.totalResolved = 0;
    // this.reports.totalTickets = 0;
    // this.reports.totalEmployees = 0;
    // this.reports.totalClients = 0;
    this.ticketService.getAllTickets().subscribe((data: Ticket[]) => {
      this.tickets = data['data'];
      console.log(this.tickets);
      this.reports.totalTickets = this.tickets.length;
      for (let i = 0; i < this.tickets.length; i++) {
        if (this.tickets[i].status == 'Pending') {
          this.reports.totalActive = this.reports.totalActive + 1;
        }
        if (this.tickets[i].status == 'Resolved') {
          this.reports.totalResolved = this.reports.totalResolved + 1;
        }
        if (this.checkForAgingTicket(this.tickets[i])) {
          this.reports.totalAging = this.reports.totalAging + 1;
        }
      }
      this.userService.getAllUsers().subscribe((data: Users[]) => {
        this.users = data['data'];
        console.log(this.users);
        this.totalUsers = this.users.length;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].roles == 'Client') {
            this.reports.totalClients = this.reports.totalClients + 1;
          }
          if (this.users[i].roles == 'Sales') {
            this.reports.totalEmployees = this.reports.totalEmployees + 1;
          }
        }
      });

      console.log('asd', this.reports);
    });
  } //end ng onit
  checkForAgingTicket(ticket: Ticket) {
    //Sun Dec 04 2022 21:40:33 GMT+0800

    let cont: boolean = false;
    const currentDay = moment();
    const createdAt = moment(ticket.created_at);
    const diff = createdAt.diff(currentDay, 'days');

    if (Math.abs(diff) > 7) {
      cont = true;
    } else cont = false;
    return cont;
  }
}
