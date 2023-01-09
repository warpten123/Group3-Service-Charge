import { ForgotComponent } from './../forgot/forgot.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UsersService } from './../services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Users } from '../services/users/user-interface';
import { RegisterComponent } from '../register/register.component';
import { ModalCreateComponent } from '../modal-create/modal-create.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UsersService,
    private toast: HotToastService,
    private dialog: MatDialog
  ) {}
  temp: number;
  count: number = 0;
  found: boolean = false;
  postUser: Users;
  authen: Users[] = [];
  ngOnInit(): void {}
  loginForm: FormGroup = new FormGroup({
    emailLogin: new FormControl('', Validators.required),
    passLogin: new FormControl('', Validators.required),
  });

  registerForm: FormGroup = new FormGroup({
    registerEmailAdd: new FormControl(
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ),
    registerLastName: new FormControl('', Validators.required),
    registerUserName: new FormControl('', Validators.required),
    registerFirstName: new FormControl('', Validators.required),
    registerPassword: new FormControl('', Validators.required),
  });
  onSubmitLogin() {
    if (this.loginForm.invalid) {
      this.toast.error('Complete your Login!');
      return;
    }
    this.userService.getAllUsers().subscribe(
      (data: Users[]) => {
        this.authen = data;
      },
      (error: any) => {
        this.toast.error(error);
      }
    );
    this.userService.getUserByEmail(this.loginForm.value.emailLogin).subscribe(
      (data: Users) => {
        this.postUser = data['data'];
        if (this.postUser.user_password == this.loginForm.value.passLogin) {
          // if (this.postUser.roles == 'Client') {
          //   this.nav('/client');
          // } else if (this.postUser.roles == 'Sales') {
          //   this.nav('/sales');
          // }
          if (this.postUser.roles != 'Client') {
            this.toast.error("You're not allowed to logged in!");
            return;
          } else {
            this.toast.success(`Welcome ${this.postUser.user_fname}!`);
            this.postUser.is_logged_in = 'true';
            this.updateLoggedIn(this.postUser);
            this.nav('/client');
          }
          // this.userService.getPassUserValue(this.postUser);
        } else {
          this.toast.error('Incorrect Password!');
          return;
        }
      },
      (error: any) => {
        this.toast.error('Invalid Login');
      }
    );

    //end subs
  }
  // onSubmitRegister() {
  //   if (this.registerForm.invalid) {
  //     this.toast.error('Invalid Registration!');
  //     return;
  //   }
  //   // const payload: Users = {

  //   //   user_email: this.registerForm.value.registerEmailAdd,
  //   //   user_lname: this.registerForm.value.registerLastName,
  //   //   user_fname: this.registerForm.value.registerFirstName,
  //   //   user_username: this.registerForm.value.registerUserName,
  //   //   user_password:  this.registerForm.value.registerPassword,

  //   // };
  //   let userCreate = new FormData();
  //   userCreate.append('user_fname', this.registerForm.value.registerFirstName);
  //   userCreate.append('user_lname', this.registerForm.value.registerLastName);
  //   userCreate.append('user_email', this.registerForm.value.registerEmailAdd);
  //   userCreate.append(
  //     'user_username',
  //     this.registerForm.value.registerUserName
  //   );
  //   userCreate.append(
  //     'user_password',
  //     this.registerForm.value.registerPassword
  //   );

  //   console.log(userCreate);
  //   this.userService
  //     .saveUser(userCreate)
  //     .pipe(
  //       this.toast.observe({
  //         success: 'Registered Successfully!',
  //         loading: 'Processing',
  //         error: (message: any) => `${message}`,
  //       })
  //     )
  //     .subscribe((data: Users) => {
  //       this.postUser = data;
  //     });
  //   this.nav('/login');
  //   this.registerForm.reset();
  // }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
  onOpenForgot() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    (dialogConfig.panelClass = 'post-dialog-container'),
      this.dialog.open(ForgotComponent, dialogConfig);
  }
  onOpenRegister() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    (dialogConfig.panelClass = 'post-dialog-container'),
      this.dialog.open(RegisterComponent, dialogConfig);
  }
  updateLoggedIn(userUpdate: Users) {
    console.log('wtf', userUpdate);
    let updateFormData = new FormData();
    updateFormData.append('user_id', userUpdate.user_id.toString());
    updateFormData.append('user_fname', userUpdate.user_fname);
    updateFormData.append('user_lname', userUpdate.user_lname.toString());
    updateFormData.append('user_email', userUpdate.user_email.toString());
    updateFormData.append('user_username', userUpdate.user_username.toString());
    updateFormData.append('user_password', userUpdate.user_password);
    updateFormData.append('is_logged_in', 'true');
    updateFormData.append('roles', userUpdate.roles.toString());
    this.userService
      .updateUser(updateFormData)
      .pipe(
        this.toast.observe({
          error: (message: any) => `${message}`,
        })
      )
      .subscribe((data: number) => {
        this.temp = data;
      });
  }
}
