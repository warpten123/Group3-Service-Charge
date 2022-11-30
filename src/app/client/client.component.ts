import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Ticket } from '../services/ticket/ticket-interface';
import { TicketService } from '../services/ticket/ticket.service';
import { Users } from '../services/users/user-interface';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  user: Users;
  id: number;
  receivedUserData: Subject<Users>;
  constructor(
    private userService: UsersService,
    private ticketService: TicketService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.receivedUserData = this.userService.passUserValue$;
    this.receivedUserData.subscribe((data: Users) => {
      this.user = data;
      this.id = this.user.user_id;
      console.log(`from service: ${this.id}`);
    });
  }

  ngOnInit(): void {}

  logout() {
    this.nav('/login');
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
