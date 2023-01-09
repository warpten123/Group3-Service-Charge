import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Users } from 'src/app/services/users/user-interface';
import { UsersService } from 'src/app/services/users/users.service';
import { AdminRegisterComponent } from '../admin-register/admin-register.component';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
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

  adminForm: FormGroup = new FormGroup({
    adminKey: new FormControl('', Validators.required),
    adminPassword: new FormControl('', Validators.required),
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
    this.userService.getUserByEmail(this.adminForm.value.adminKey).subscribe(
      (data: Users) => {
        this.postUser = data['data'];
        if (this.postUser.user_password == this.adminForm.value.adminPassword) {
          if (this.postUser.roles == 'Admin') {
            this.toast.success(`Welcome ${this.postUser.user_fname}!`);
            this.nav('admin-dashboard');
          } else {
            this.toast.error("You're not allowed to logged in!");
            return;
          }
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

  onRegisterAdmin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    (dialogConfig.panelClass = 'post-dialog-container'),
      this.dialog.open(AdminRegisterComponent, dialogConfig);
  }
}
