import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }

  users: [];
  ngOnInit(): void {
   this.http.get("http://localhost:8080/user/all").pipe(map(
     resp=>resp)).subscribe((data: any)=>{this.users=data;
      console.log(this.users);}
      
      ); 
    
    }

}
