import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, Subject, tap } from 'rxjs';
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
  @ViewChild('viewmodal') content: any;
  view: boolean = false;
  temp: number;
  user!: Users;
  postTicket: Ticket;
  getTicket!: Ticket;
  public id: number;
  test: Users;
  tickets: Ticket[] = [];
  getDate = Date;
  search: Ticket[] = [];
  receivedUserData: Subject<Users>;
  loginForm: any;
  postUser: Users[] = [];
  bindUser: Users;

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
      this.id = this.user.user_id;
    });
  }

  viewTicketForm: FormGroup = new FormGroup({
    ticketSubject: new FormControl('', Validators.required),
    ticketDesc: new FormControl('', Validators.required),
    ticketAssignee: new FormControl('', Validators.required),
    ticketTracker: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data: Users) => {
        this.postUser = data['data'];
        for (let i = 0; i < this.postUser.length; i++) {
          if (this.postUser[i].is_logged_in === 'true') {
            this.bindUser = this.postUser[i];
            this.getTicketsByUser(this.bindUser);
            console.log('tickets: ', this.tickets);
            break;
          }
        }
      },
      (error: any) => {
        this.toast.error('Invalid Login');
      }
    );
    setTimeout(() => {
      this.ngOnInit();
    }, 1000 * 1);
  }

  // ngAfterViewInit(){
  //   window.location.reload();
  // }
  // updateLoggedIn(postUser: any) {
  //   throw new Error('Method not implemented.');
  // }
  ticketForm: FormGroup = new FormGroup({
    ticketSubject: new FormControl('', Validators.required),
    ticketDesc: new FormControl('', Validators.required),
  });
  logout(user: Users) {
    let updateFormData = new FormData();
    updateFormData.append('user_id', user.user_id.toString());
    updateFormData.append('user_fname', user.user_fname);
    updateFormData.append('user_lname', user.user_lname.toString());
    updateFormData.append('user_email', user.user_email.toString());
    updateFormData.append('user_username', user.user_username.toString());
    updateFormData.append('user_password', user.user_password);
    updateFormData.append('is_logged_in', 'false');
    this.userService
      .updateUser(updateFormData)
      .pipe(
        this.toast.observe({
          error: (message: any) => `${message}`,
        })
      )
      .subscribe((data: number) => {
        this.temp = data;
      });

    this.nav('/login');
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
  getTicketsByUser(user: Users) {
    this.ticketService.getAllTicketsByUser(user.user_id).subscribe(
      (data: Ticket[]) => {
        if (data['message'] != null) {
          this.tickets = data['data'];
        }
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
  passTicket(ticket: Ticket) {
    this.getTicket = ticket;
  }
  onSubmitTicket(user: Users) {
    var moment = require('moment');
    var current_timestamp = moment();
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
      userID: user.user_id,
      created_at: current_timestamp,
    };
    let formData = new FormData();

    formData.append('description', payload.description);
    formData.append('tracker', payload.tracker);
    formData.append('subject', payload.subject);
    formData.append('status', payload.status);
    formData.append('assignee', payload.assignee);
    formData.append('userID', payload.userID.toString());
    formData.append('created_at', payload.created_at);

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
  // filterItems(search: string) {
  //   this.tickets.length = 0;

  //   this.ticketService.getAllTicketsByUser(this.bindUser.user_id).subscribe(
  //     (data: Ticket[]) => {
  //       this.search = data['data'];
  //       for (let i = 0; i < this.search.length; i++) {
  //         console.log(
  //           this.search[i].subject +
  //             ' ' +
  //             this.search[i].subject.toLowerCase().includes(search)
  //         );
  //         if (this.search[i].subject.includes(search)) {
  //           this.tickets.push(this.search[i]);
  //         }
  //       }
  //       if (!this.searchForm.valid) {
  //         this.getTicketsByUser(this.bindUser);
  //       }
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }
}
