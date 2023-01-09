import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadFile(file: FormData) {
    console.log(file);
    return this.http
      .post(`http://localhost:8080/file/create`, file)
      .pipe(map((resp) => resp));
  }
}
