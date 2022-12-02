import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Ticket } from '../services/ticket/ticket-interface';
import { TicketService } from '../services/ticket/ticket.service';
import { Users } from '../services/users/user-interface';
import { UsersService } from '../services/users/users.service';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UpdateTicketComponent } from '../update-ticket/update-ticket.component';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  view: boolean = false;
  user!: Users;
  postTicket: Ticket;
  getTicket!: Ticket;
  id: number;
  tickets: Ticket[] = [];
  getDate = Date;
  receivedUserData!: Subject<Users>;
  constructor(
    private userService: UsersService,
    private ticketService: TicketService,
    private dialog: MatDialog,
    private router: Router,
    private toast: HotToastService
  ) {
    this.receivedUserData = this.userService.passUserValue$;
    this.receivedUserData.subscribe((user: Users) => {
      this.user = user;
      console.log(`from service: ${this.user.user_fname}`);
    });
  }

  ngOnInit(): void {
    this.getAllTicket();
  }
  ticketForm: FormGroup = new FormGroup({
    ticketSubject: new FormControl('', Validators.required),
    ticketDesc: new FormControl('', Validators.required),
  });
  logout() {
    this.nav('/login');
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
  getAllTicket() {
    this.ticketService.getAllTickets().subscribe(
      (data: Ticket[]) => {
        this.tickets = data['data'];
        console.log(this.tickets[0].description);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  onSubmitTicket() {
    var moment = require('moment');
    var current_timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
    if (this.ticketForm.invalid) {
      this.toast.error('Error Creating Ticket!');
      return;
    }
    const payload: Ticket = {
      // created_at: current_timestamp.toString(),
      description: this.ticketForm.value.ticketDesc,
      subject: this.ticketForm.value.ticketSubject,
      status: 'Pending',
      tracker: 'Pending',
      assignee: 'Pending',
      userID: 1,
    };
    let formData = new FormData();

    formData.append('description', payload.description);
    formData.append('tracker', payload.tracker);
    formData.append('subject', payload.subject);
    formData.append('status', payload.status);
    formData.append('assignee', payload.assignee);
    formData.append('userID', payload.userID.toString());

    this.ticketService
      .saveTicket(formData)
      .pipe(
        this.toast.observe({
          success: 'Ticket Created!',
          loading: 'Processing',
          error: (message: any) => `${message}`,
        })
      )
      .subscribe((data: Ticket) => {
        this.postTicket = data['data'];

        window.location.reload();
      });
  }
  passTicket(ticket: Ticket) {
    this.view = true;

    this.getTicket = ticket;
    console.log(this.getTicket.ticketID);
    // console.log(`from user ${ticket.ticketID}`);
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '60%';
    // (dialogConfig.panelClass = 'post-dialog-container'),
    //   this.dialog.open(ModalCreateComponent, dialogConfig);
    // console.log(`ticket ${ticket}`);
    // this.ticketService.getPassTicketValue(ticket);
  }
}
