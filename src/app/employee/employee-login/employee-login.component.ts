import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Users } from 'src/app/services/users/user-interface';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UsersService,
    private toast: HotToastService,
    private dialog: MatDialog
  ) {}
  count: number = 0;
  found: boolean = false;
  postUser: Users;
  authen: Users[] = [];
  ngOnInit(): void {}

  employeeForm: FormGroup = new FormGroup({
    empLogin: new FormControl('', Validators.required),
    empPassword: new FormControl('', Validators.required),
  });
  onSubmitLogin() {
    this.userService.getAllUsers().subscribe(
      (data: Users[]) => {
        this.authen = data;
      },
      (error: any) => {
        this.toast.error(error);
      }
    );
    this.userService.getUserByEmail(this.employeeForm.value.empLogin).subscribe(
      (data: Users) => {
        this.postUser = data['data'];
        if (this.postUser.user_password == this.employeeForm.value.empPassword) {
          this.toast.success(`Welcome ${this.postUser.user_fname}!`);
          this.nav('sales');
        } else {
          this.toast.error('Incorrect Password!');
          return;
        }
      },
      (error: any) => {
        this.toast.error('Invalid Login');
      }
    );
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }

}
