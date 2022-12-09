import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Ticket } from 'src/app/services/ticket/ticket-interface';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Users } from 'src/app/services/users/user-interface';
import { UsersService } from 'src/app/services/users/users.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-client-aging',
  templateUrl: './client-aging.component.html',
  styleUrls: ['./client-aging.component.css'],
})
export class ClientAgingComponent implements OnInit {
  agingTickets: Ticket[] = [];
  bindUser: Users;
  postUser: Users[] = [];
  tickets: Ticket[] = [];
  getTicket: Ticket;
  constructor(
    private userService: UsersService,
    private ticketService: TicketService,
    private toast: HotToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data: Users) => {
        this.postUser = data['data'];
        for (let i = 0; i < this.postUser.length; i++) {
          if (this.postUser[i].is_logged_in === 'true') {
            this.bindUser = this.postUser[i];
            this.getTicketsByUser(this.bindUser);
            break;
          }
        }
      },
      (error: any) => {
        this.toast.error('Invalid Login');
      }
    );
    var urlParams = [];
    window.location.search
      .replace('?', '')
      .split('&')
      .forEach(function (e, i) {
        var p = e.split('=');
        urlParams[p[0]] = p[1];
      });
  }
  getTicketsByUser(user: Users) {
    this.ticketService.getAllTicketsByUser(user.user_id).subscribe(
      (data: Ticket[]) => {
        this.tickets = data['data'];

        for (let i = 0; i < this.tickets.length; i++) {
          if (
            this.checkForAgingTicket(this.tickets[i]) == true &&
            this.tickets[i].status != 'Resolved'
          ) {
            this.agingTickets.push(this.tickets[i]);
            console.log(this.agingTickets);
          }
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  checkForAgingTicket(ticket: Ticket) {
    //Sun Dec 04 2022 21:40:33 GMT+0800

    let isAging: boolean = false;
    const currentDay = moment();
    const createdAt = moment(ticket.created_at);
    const diff = createdAt.diff(currentDay, 'days');

    if (Math.abs(diff) > 7) {
      isAging = true;
    } else isAging = false;
    return isAging;
  }
  passTicket(ticket: Ticket) {
    this.getTicket = ticket;
  }
  toResolved() {
    this.nav('/client-resolved');
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
