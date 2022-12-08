import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../ticket/ticket-interface';
import { TicketService } from '../ticket/ticket.service';
import { catchError, retry, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ConfirmnService {
  constructor(private http: HttpClient) {}

  createSlip(slip: FormData) {
    return this.http
      .post(`http://localhost:8080/confirm_slip/create`, slip)
      .pipe(map((resp) => resp));
  }
}
