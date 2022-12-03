import { UserDashboardComponent } from './../user-dashboard/user-dashboard.component';
import { Router } from '@angular/router';

import { TicketService } from './../services/ticket/ticket.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Ticket } from '../services/ticket/ticket-interface';
interface Assignee {
  name: string;
}

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.css'],
})
export class ModalCreateComponent implements OnInit {
  postTicket: Ticket;
  selectedValue: string;
  selectedCar: string;
  refreshTicket: Ticket[] = [];
  constructor(
    private dialog: MatDialog,
    private toast: HotToastService,
    private HttpClient: HttpClient,
    private ticketService: TicketService,
    private router: Router
  ) {}

  ticketForm: FormGroup = new FormGroup({
    ticketAssignee: new FormControl('', Validators.required),
    ticketSubject: new FormControl('', Validators.required),
    ticketDescription: new FormControl('', Validators.required),
    ticketTracker: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    console.log(this.selectedValue);
  }

  assignee: Assignee[] = [
    { name: 'Morales' },
    { name: 'Premacio' },
    { name: 'Pinote' },
    { name: 'Tuso' },
  ];

  assignees: string[] = ['Pinote', 'Premacio', 'Tuso', 'Morales'];
  selectedAssignee: string;
  onSubmitCreate() {
    if (this.ticketForm.invalid) {
      this.toast.error('Error Creating Ticket!');
      return;
    }
    const payload: Ticket = {
      assignee: this.ticketForm.value.ticketAssignee,
      tracker: this.ticketForm.value.ticketTracker,
      description: this.ticketForm.value.ticketDescription,
      subject: this.ticketForm.value.ticketSubject,
      status: 'Pending',
    };
    let formData = new FormData();
    formData.append('assignee', payload.assignee);
    formData.append('tracker', payload.tracker);
    formData.append('description', payload.description);
    formData.append('subject', payload.subject);
    formData.append('status', payload.status);
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
        console.log(`from ${this.postTicket}`);
        this.close();
        window.location.reload();
      });
  }

  close() {
    this.dialog.closeAll();
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
