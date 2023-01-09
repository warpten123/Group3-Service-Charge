import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../ticket/ticket-interface';
import { TicketService } from '../ticket/ticket.service';
import { catchError, retry, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Confirm } from './confirm-interface';
@Injectable({
  providedIn: 'root',
})
export class ConfirmnService {
  constructor(private http: HttpClient) {}
  ///Subject
  passConfirmValue$: Subject<Confirm> = new Subject();
  get passConfirmValue(): Subject<Confirm> {
    return this.passConfirmValue$;
  }
  set passConfirmValue(src: Subject<Confirm>) {
    this.passConfirmValue$ = src;
  }
  getPassConfirmValue(confirm: Confirm) {
    this.passConfirmValue$.next(confirm);
  }
  ///end subjet

  createSlip(slip: FormData) {
    return this.http
      .post(`http://localhost:8080/confirm_slip/create`, slip)
      .pipe(map((resp) => resp));
  }
  updateSlip(slip: FormData) {
    return this.http
      .put(`http://localhost:8080/confirm_slip/update`, slip)
      .pipe(map((resp) => resp));
  }
  getAllSlip() {
    return this.http
      .get(`http://localhost:8080/confirm_slip/all`)
      .pipe(map((resp) => resp));
  }
  getSlipByID(id: number) {
    return this.http
      .get(`http://localhost:8080/confirm_slip/slip/${id}`)
      .pipe(map((resp) => resp));
  }
  getSlipsByUserID(id: number) {
    return this.http
      .get(`http://localhost:8080/confirm_slip/slip_user/${id}`)
      .pipe(map((resp) => resp));
  }
}
