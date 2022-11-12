import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Ticket } from './ticket-interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  tickets: Ticket[]=[];
  constructor(private http: HttpClient) { }

  getAllTickets(){
    return this.http.get("http://localhost:8080/ticket/all").pipe(map(
      resp=>resp));
  }
  saveTicket(ticket: Ticket){
    return this.http.post("http://localhost:8080/ticket/create",ticket).pipe(map(resp=>resp));
  }
  deleteTicket(ticket_id: number){
    return this.http.delete(`http://localhost:8080/ticket/delete/${ticket_id}`).pipe(map(resp=>resp));
  }
  // updateTicket(ticket: Ticket){
  //   return this.http.
  // }
  updateTicket(ticket: Ticket, ticket_id: number){
    return this.http.post(`http://localhost:8080/ticket/update/${ticket_id}`,ticket).pipe(map(resp=>resp));
  }
  refreshTicket(){
    return this.getAllTickets().subscribe((data: Ticket[])=>{this.tickets=data;
        console.log(this.tickets);},(error: any)=>{
          console.error(error);
        }
        ); 
    
  }

  ticketForm: FormGroup = new FormGroup({
    ticketAssignee: new FormControl('', Validators.required),
    ticketTracker: new FormControl('', Validators.required),
    ticketSubject: new FormControl('', Validators.required),
    ticketDescription: new FormControl('', Validators.required),
    
  });

  populateForm(ticket: Ticket){
    this.ticketForm.patchValue(ticket);
  }
}
