import { Subject } from 'rxjs';
import { TicketService } from './../services/ticket/ticket.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ticket } from '../services/ticket/ticket-interface';
import { tick } from '@angular/core/testing';
import { UsersService } from '../services/users/users.service';
import { Users } from '../services/users/user-interface';
interface Assignee {
  name: string;
}
interface Status {
  stat: string;
}
interface Tracker {
  track: string;
}

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css'],
})
export class UpdateTicketComponent implements OnInit {
  ticket: Ticket;
  data: number;
  strID: String;
  selectedValue: string;
  selectedStatus: string;
  selectedTracker: string;

  finalAssignee: string;
  finalStatus: string;
  finalTracker: string;

  receivedTicketData: Subject<Ticket>;
  constructor(
    private dialog: MatDialog,
    private toast: HotToastService,
    public ticketService: TicketService,
    private router: Router,
    private userService: UsersService
  ) {
    this.receivedTicketData = this.ticketService.passTicketValue$;
    this.receivedTicketData.subscribe((data: Ticket) => {
      this.ticket = data;
    });
  }
  sales: String = 'Sales';
  assignee: Users[] = [];
  users: Users[] = [];
  tracker: Tracker[] = [
    { track: 'Pending' },
    { track: 'Feature' },
    { track: 'Bug' },
    { track: 'Front-end' },
    { track: 'Back-end' },
  ];
  status: Status[] = [{ stat: 'Pending' }, { stat: 'Checked' }];
  bool: boolean[] = [];
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: Users) => {
      this.users = data['data'];
      let check = 0;
      for (let i = 0; i < this.users.length; i++) {
        this.bool.push(this.users[i].roles === 'Sales');
      }
      for (let i = 0; i < this.users.length; i++) {
        if (this.bool[i] == true) {
          this.assignee.push(this.users[i]);
        }
      }
    });
    this.finalAssignee = 'Pending';
    this.finalStatus = 'Pending';
    this.finalTracker = 'Pending';
    this.ticketForm.controls['ticketSubject'].disable();
    this.ticketForm.controls['ticketDescription'].disable();
    this.ticketForm.patchValue({
      ticketID: this.ticket.ticketID,
      ticketAssignee: this.ticket.assignee,
      ticketTracker: this.ticket.tracker,
      ticketSubject: this.ticket.subject,
      ticketDescription: this.ticket.description,
      ticketStatus: this.ticket.status,
    });
  }
  ticketForm: FormGroup = new FormGroup({
    ticketAssignee: new FormControl('', Validators.required),
    ticketTracker: new FormControl('', Validators.required),
    ticketSubject: new FormControl('', Validators.required),
    ticketDescription: new FormControl('', Validators.required),
    ticketStatus: new FormControl('', Validators.required),
  });
  getValueFromAssignee(value) {
    this.finalAssignee = value;
  }
  getValueFromStatus(value) {
    this.finalStatus = value;
  }
  getValueFromTracker(value) {
    this.finalTracker = value;
  }
  onSubmitUpdate(ticket: Ticket) {
    if (
      this.finalAssignee == 'Pending' ||
      this.finalStatus == 'Pending' ||
      this.finalTracker == 'Pending'
    ) {
      this.toast.error('Error Updating Ticket!');
      return;
    }
    this.ticketForm.controls['ticketSubject'].enable();
    this.ticketForm.controls['ticketDescription'].enable();

    const payload: Ticket = {
      ticketID: ticket.ticketID,
      assignee: this.finalAssignee,
      tracker: this.finalTracker,
      description: this.ticketForm.value.ticketDescription,
      subject: this.ticketForm.value.ticketSubject,
      status: this.finalStatus,
    };
    let formData = new FormData();
    formData.append('ticketID', payload.ticketID.toString());
    formData.append('assignee', payload.assignee);
    formData.append('tracker', payload.tracker);
    formData.append('description', payload.description);
    formData.append('subject', payload.subject);
    formData.append('status', payload.status);

    this.ticketService
      .updateTicket(ticket.ticketID, formData)
      .pipe(
        this.toast.observe({
          success: 'Updated Successfully!',
          loading: 'Processing',
          error: (message: any) => `${message}`,
        })
      )
      .subscribe((data: number) => {
        this.data = data;
      });
  }
  close() {
    window.location.reload();
    this.ticketForm.reset;
    this.dialog.closeAll();
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
