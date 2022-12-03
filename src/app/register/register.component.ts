import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Users } from '../services/users/user-interface';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
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

  registerForm: FormGroup = new FormGroup({
    registerEmailAdd: new FormControl('', Validators.required),
    registerLastName: new FormControl('', Validators.required),
    registerUserName: new FormControl('', Validators.required),
    registerFirstName: new FormControl('', Validators.required),
    registerPassword: new FormControl('', Validators.required),
  });
  onSubmitRegister() {
    if (this.registerForm.invalid) {
      this.toast.error('Invalid Registration!');
      return;
    }
    // const payload: Users = {

    //   user_email: this.registerForm.value.registerEmailAdd,
    //   user_lname: this.registerForm.value.registerLastName,
    //   user_fname: this.registerForm.value.registerFirstName,
    //   user_username: this.registerForm.value.registerUserName,
    //   user_password:  this.registerForm.value.registerPassword,

    // };
    let userCreate = new FormData();
    userCreate.append('user_fname', this.registerForm.value.registerFirstName);
    userCreate.append('user_lname', this.registerForm.value.registerLastName);
    userCreate.append('user_email', this.registerForm.value.registerEmailAdd);
    userCreate.append(
      'user_username',
      this.registerForm.value.registerUserName
    );
    userCreate.append(
      'user_password',
      this.registerForm.value.registerPassword
    );
    userCreate.append('is_logged_in', 'false');
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

    this.registerForm.reset();
    this.close();
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
