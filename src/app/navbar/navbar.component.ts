import { ModalCreateComponent } from './../modal-create/modal-create.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Users } from '../services/users/user-interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userService: any;
  toast: any;
  temp: number;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

  modalCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    (dialogConfig.panelClass = 'post-dialog-container'),
      this.dialog.open(ModalCreateComponent, dialogConfig);
  }
  logout() {
    console.log('clicked logout');
    this.router.navigate(['/login']);
  }
  updateLoggedIn(userUpdate: Users) {
    let updateFormData = new FormData();
    updateFormData.append('user_id', userUpdate.user_id.toString());
    updateFormData.append('user_fname', userUpdate.user_fname);
    updateFormData.append('user_lname', userUpdate.user_lname.toString());
    updateFormData.append('user_email', userUpdate.user_email.toString());
    updateFormData.append('user_username', userUpdate.user_username.toString());
    updateFormData.append('user_password', userUpdate.user_password);
    updateFormData.append('is_logged_in', 'false');
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
