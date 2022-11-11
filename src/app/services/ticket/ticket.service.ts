import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Ticket } from './ticket-interface';
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
}
