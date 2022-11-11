import { ModalCreateComponent } from './../modal-create/modal-create.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  modalCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true;
    dialogConfig.width =  "60%";
    dialogConfig.panelClass = 'post-dialog-container',
    this.dialog.open(ModalCreateComponent,dialogConfig);
  }
  logout(){
    console.log('clicked logout');
    this.router.navigate(['/login']);
   
  }
}
