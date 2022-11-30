import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Users } from './user-interface';
import { Ticket } from '../ticket/ticket-interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: Users[] = [];
  constructor(private http: HttpClient) {}

  //subject
  passUserValue$: Subject<Users> = new Subject();
  get passUserValue(): Subject<Users> {
    return this.passUserValue$;
  }
  set passUserValue(src: Subject<Users>) {
    this.passUserValue$ = src;
  }
  getPassUserValue(user: Users) {
    this.passUserValue$.next(user);
  }
  //end subject
  getAllUsers() {
    return this.http
      .get('http://localhost:8080/user/all')
      .pipe(map((resp) => resp));
  }
  saveUser(user: FormData) {
    return this.http
      .post('http://localhost:8080/user/create', user)
      .pipe(map((resp) => resp));
  }
  getUserByEmail(user_email: string) {
    return this.http
      .get(`http://localhost:8080/user/email/${user_email}`)
      .pipe(map((resp) => resp));
  }
  updateUser(user: FormData) {
    return this.http
      .put(`http://localhost:8080/user/update`, user)
      .pipe(map((resp) => resp));
  }
}
