import { Subject } from 'rxjs';
import { TicketService } from './../services/ticket/ticket.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ticket } from '../services/ticket/ticket-interface';
import { tick } from '@angular/core/testing';
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
    private router: Router
  ) {
    this.receivedTicketData = this.ticketService.passTicketValue$;
    this.receivedTicketData.subscribe((data: Ticket) => {
      this.ticket = data;
      console.log(`from service: ${this.ticket}`);
    });
  }

  assignee: Assignee[] = [
    { name: 'Morales' },
    { name: 'Premacio' },
    { name: 'Pinote' },
    { name: 'Tuso' },
  ];
  tracker: Tracker[] = [
    { track: 'Feature' },
    { track: 'Bug' },
    { track: 'Front-end' },
    { track: 'Back-end' },
  ];
  status: Status[] = [
    { stat: 'Pending' },
    { stat: 'Accepted' },
    { stat: 'Resolved' },
  ];
  ngOnInit(): void {
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
    console.log(this.finalAssignee);
  }
  getValueFromStatus(value) {
    this.finalStatus = value;
    console.log(this.finalStatus);
  }
  getValueFromTracker(value) {
    this.finalTracker = value;
    console.log(this.finalTracker);
  }
  onSubmitUpdate(ticket: Ticket) {
    this.ticketForm.controls['ticketSubject'].enable();
    this.ticketForm.controls['ticketDescription'].enable();
    console.log(`update ${ticket.ticketID}`);
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
