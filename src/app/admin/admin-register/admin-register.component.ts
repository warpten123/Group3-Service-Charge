import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Users } from 'src/app/services/users/user-interface';
import { UsersService } from 'src/app/services/users/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'],
})
export class AdminRegisterComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UsersService,
    private toast: HotToastService
  ) {}
  postUser: Users;
  ngOnInit(): void {}
  close() {
    this.dialog.closeAll();
  }

  registerAdminForm: FormGroup = new FormGroup({
    registerEmailAdd: new FormControl('', Validators.required),
    registerLastName: new FormControl('', Validators.required),
    registerUserName: new FormControl('', Validators.required),
    registerFirstName: new FormControl('', Validators.required),
    registerPassword: new FormControl('', Validators.required),
  });
  onSubmitRegisterAdmin() {
    if (this.registerAdminForm.invalid) {
      this.toast.error('Invalid Registration!');
      return;
    }
    // const payload: Users = {

    //   user_email: this.registerAdminForm.value.registerEmailAdd,
    //   user_lname: this.registerAdminForm.value.registerLastName,
    //   user_fname: this.registerAdminForm.value.registerFirstName,
    //   user_username: this.registerAdminForm.value.registerUserName,
    //   user_password:  this.registerAdminForm.value.registerPassword,

    // };
    let userCreate = new FormData();
    userCreate.append('user_fname', this.registerAdminForm.value.registerFirstName);
    userCreate.append('user_lname', this.registerAdminForm.value.registerLastName);
    userCreate.append('user_email', this.registerAdminForm.value.registerEmailAdd);
    userCreate.append(
      'user_username',
      this.registerAdminForm.value.registerUserName
    );
    userCreate.append(
      'user_password',
      this.registerAdminForm.value.registerPassword
    );
    userCreate.append('is_logged_in', 'false');
    userCreate.append('roles', 'Admin');
    this.userService
      .saveUser(userCreate)
      .pipe(
        this.toast.observe({
          success: 'Registered Successfully!',
          loading: 'Processing',
          error: (message: any) => `${message}`,
        })
      )
      .subscribe((data: Users) => {
        this.postUser = data;
        this.nav('login');
      });

    this.registerAdminForm.reset();
    this.close();
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
