import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Ticket } from './ticket-interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TicketService {
  tickets: Ticket[] = [];
  passTicketValue$: Subject<Ticket> = new Subject();
  get passTicketValue(): Subject<Ticket> {
    return this.passTicketValue$;
  }
  set passTicketValue(src: Subject<Ticket>) {
    this.passTicketValue$ = src;
  }
  getPassTicketValue(ticket: Ticket) {
    this.passTicketValue$.next(ticket);
  }

  // passCarsValuesArray$: Subject<CarsInterface[]> = new Subject();
  // get passCarsValuesArray(): Subject<CarsInterface[]>{
  //   return this.passCarsValuesArray$;
  // }
  // set passCarsValuesArray(src: Subject<CarsInterface[]>){
  //   this.passCarsValuesArray$ = src;
  // }
  // getPassCarValueArray(car: CarsInterface[]){
  //   this.passCarsValuesArray$.next(car);
  // }
  constructor(private http: HttpClient) {}

  getAllTickets() {
    return this.http
      .get('http://localhost:8080/ticket/all')
      .pipe(map((resp) => resp));
  }
  saveTicket(ticket: FormData) {
    return this.http
      .post('http://localhost:8080/ticket/create', ticket)
      .pipe(map((resp) => resp));
  }
  deleteTicket(ticketID: number) {
    return this.http
      .delete(`http://localhost:8080/ticket/delete/${ticketID}`)
      .pipe(map((resp) => resp));
  }
  // updateTicket(ticket: Ticket){
  //   return this.http.
  // }
  updateTicket(ticket_id: number, ticket: FormData) {
    return this.http
      .put(`http://localhost:8080/ticket/update`, ticket)
      .pipe(map((resp) => resp));
  }
  getAllTicketsByUser(id: number) {
    return this.http
      .get(`http://localhost:8080/ticket/user/${id}`)
      .pipe(map((resp) => resp));
  }

  refreshTicket() {
    return this.getAllTickets().subscribe(
      (data: Ticket[]) => {
        this.tickets = data;
        console.log(this.tickets);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  editTicketForm: FormGroup = new FormGroup({
    ticketAssignee: new FormControl('', Validators.required),
    ticketTracker: new FormControl('', Validators.required),
    ticketSubject: new FormControl('', Validators.required),
    ticketDescription: new FormControl('', Validators.required),
  });

  populateForm(ticket: Ticket) {
    this.editTicketForm.patchValue(ticket);
    console.log(this.editTicketForm.value);
  }
}
