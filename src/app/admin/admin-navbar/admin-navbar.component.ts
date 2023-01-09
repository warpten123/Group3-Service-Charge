import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalCreateComponent } from 'src/app/modal-create/modal-create.component';
import { NewUserComponent } from '../new-user/new-user.component';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
})
export class AdminNavbarComponent implements OnInit {
  serService: any;
  toast: any;
  temp: number;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

  modalCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    (dialogConfig.panelClass = 'post-dialog-container'),
      this.dialog.open(NewUserComponent, dialogConfig);
  }
  logout() {
    this.router.navigate(['/login']);
  }
  toHome() {
    this.router.navigate(['/admin-dashboard']);
  }
}
