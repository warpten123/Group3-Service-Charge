import { Subject } from 'rxjs';
import { TicketService } from './../services/ticket/ticket.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ticket } from '../services/ticket/ticket-interface';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit {
  ticket: Ticket;
  data: number;
  receivedTicketData: Subject<Ticket>;
  constructor(
    private dialog: MatDialog,
    private toast: HotToastService,
    public ticketService: TicketService,
    private router: Router,
  ) { 
    this.receivedTicketData = this.ticketService.passTicketValue$;
    this.receivedTicketData.subscribe((data:Ticket)=>{
      this.ticket = data;
      console.log(`from service: ${this.ticket}`);
    })
  }

  ngOnInit(): void {
   
   this.ticketForm.patchValue({
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
  onSubmitUpdate(ticket: Ticket){
    const payload: Ticket = {
      assignee: this.ticketForm.value.ticketAssignee,
      tracker: this.ticketForm.value.ticketTracker,
      description: this.ticketForm.value.ticketDescription,
      subject: this.ticketForm.value.ticketSubject,
      status: this.ticketForm.value.ticketStatus,
    };
    console.log(`payload ${payload.assignee}`);
    this.ticketService.updateTicket(ticket.ticket_id,payload).pipe(this.toast.observe({
      success: "Updated Successfully!",
      loading: "Processing",
      error: (message: any) => `${message}`
    })).subscribe((data: number)=>{
      this.data = data;
     
    });
   
  
    
    
  }
  close(){
    window.location.reload();
    this.ticketForm.reset;
    this.dialog.closeAll();
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
