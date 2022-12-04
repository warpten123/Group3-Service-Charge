import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Users } from 'src/app/services/users/user-interface';
import { UsersService } from 'src/app/services/users/users.service';
interface Departments {
  department: string;
}
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  departments: Departments[] = [
    { department: 'Billing' },
    { department: 'Sales' },
    { department: 'Collection' },
    { department: 'Treasury' },
    { department: 'Developer' },
  ];
  postUser: Users;
  selectedRoles: string;
  finalRole: string;
  registerForm: FormGroup = new FormGroup({
    registerEmailAdd: new FormControl('', Validators.required),
    registerLastName: new FormControl('', Validators.required),
    registerUserName: new FormControl('', Validators.required),
    registerFirstName: new FormControl('', Validators.required),
    registerPassword: new FormControl('', Validators.required),
  });
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UsersService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}

  getValueFromRoles(value) {
    this.finalRole = value;
  }
  onSubmitCreate() {
    if (this.registerForm.invalid || this.finalRole == undefined) {
      this.toast.error('Error Creating User!');
      return;
    }
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
    userCreate.append('roles', this.finalRole);
    this.userService
      .saveUser(userCreate)
      .pipe(
        this.toast.observe({
          success: 'Created Successfully!',
          loading: 'Processing',
          error: (message: any) => `${message}`,
        })
      )
      .subscribe((data: Users) => {
        this.postUser = data;
        // this.nav('login');
      });

    this.registerForm.reset();
    this.close();
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
  close() {
    this.dialog.closeAll();
  }
  refreshForm() {
    this.registerForm.reset();
  }
}
