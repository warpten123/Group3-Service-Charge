import { UsersService } from './../services/users/users.service';
import { Users } from './../services/users/user-interface';
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

  constructor(private http: HttpClient, private userService: UsersService) { }

  users: Users[]=[];
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: Users[])=>{this.users=data;
      console.log(this.users);},(error: any)=>{
        console.error(error);
      }
      
      ); 
    }

}
