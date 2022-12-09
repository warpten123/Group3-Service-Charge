import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import * as moment from 'moment';
import { ModalCreateComponent } from 'src/app/modal-create/modal-create.component';
import { Confirm } from 'src/app/services/confirm/confirm-interface';
import { ConfirmnService } from 'src/app/services/confirm/confirmn.service';
import { Ticket } from 'src/app/services/ticket/ticket-interface';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Users } from 'src/app/services/users/user-interface';
import { UsersService } from 'src/app/services/users/users.service';
import { UpdateTicketComponent } from 'src/app/update-ticket/update-ticket.component';
import { ConfirmSlipComponent } from '../confirm-slip/confirm-slip.component';
import { VerifySlipComponent } from '../verify-slip/verify-slip.component';

@Component({
  selector: 'app-sales-team-dashboard',
  templateUrl: './sales-team-dashboard.component.html',
  styleUrls: ['./sales-team-dashboard.component.css'],
})
export class SalesTeamDashboardComponent implements OnInit {
  tickets: Ticket[] = [];
  finalTickets: Ticket[] = [];
  users: Users[] = [];
  bindUser: Users;
  bool: boolean[] = [];
  confirmSlip: Confirm[] = [];
  passConfirm: Confirm;
  temp: number;
  constructor(
    private userService: UsersService,
    private ticketService: TicketService,
    private dialog: MatDialog,
    private router: Router,
    private confirmService: ConfirmnService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllTicket();
  }
  logout(user: Users) {
    let updateFormData = new FormData();
    updateFormData.append('user_id', user.user_id.toString());
    updateFormData.append('user_fname', user.user_fname);
    updateFormData.append('user_lname', user.user_lname.toString());
    updateFormData.append('user_email', user.user_email.toString());
    updateFormData.append('user_username', user.user_username.toString());
    updateFormData.append('user_password', user.user_password);
    updateFormData.append('is_logged_in', 'false');
    updateFormData.append('roles', user.roles.toString());
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

    this.nav('/employee-login');
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: Users[]) => {
        this.users = data['data'];
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].is_logged_in === 'true') {
            this.bindUser = this.users[i];
          }
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  getAllTicket() {
    this.ticketService.getAllTickets().subscribe(
      (data: Ticket[]) => {
        this.tickets = data['data'];

        let check = 0;
        for (let i = 0; i < this.tickets.length; i++) {
          this.bool.push(
            this.tickets[i].assignee === this.bindUser?.user_lname
          );
        }
        console.log(this.bool);
        for (let i = 0; i < this.tickets.length; i++) {
          if (this.bool[i] === true) {
            this.finalTickets.push(this.tickets[i]);
          }
        }
        // for (let i = 0; i < this.tickets.length; i++) {
        //   if (this.tickets[i].assignee == this.bindUser.user_lname) {
        //     console.log(this.tickets[i].assignee == this.bindUser.user_lname);
        //   }
        // }
        // this.tickets[i].created_at = moment().format('YYYY-MM-DD');

        const currentDay = moment();
        // const createdDate = moment(this.tickets[0].created_at);
        // const diff = createdDate.diff(currentDay, 'days');
        // console.log(diff);

        // const diff = rentalDate.diff(currentDay, 'days');
        // const finalDate = moment(currentDay);
        // let date = moment(test, 'YYYY-MM-DD').format('MMMM Do YYYY, h:mm:ss a');
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  modalCreate() {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true
    // dialogConfig.autoFocus = true;
    // dialogConfig.width =  "60%";
    // dialogConfig.panelClass = 'post-dialog-container',
    // this.dialog.open(ModalCreateComponent,dialogConfig);
    this.dialog.open(ModalCreateComponent, {
      width: '60%',
      autoFocus: true,
      disableClose: true,
    });
  }
  openSlip(ticket: Ticket) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true
    // dialogConfig.autoFocus = true;
    // dialogConfig.width =  "60%";
    // dialogConfig.panelClass = 'post-dialog-container',
    // this.dialog.open(ModalCreateComponent,dialogConfig);
    this.dialog.open(ConfirmSlipComponent, {
      width: '30%',
      autoFocus: true,
      disableClose: false,
    });
    this.ticketService.getPassTicketValue(ticket);
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
  updateTicket(ticket: Ticket) {
    //   const payload: Ticket = {
    //     assignee: "asd",
    //     tracker: "3test",
    //     description: "5",
    //     subject: "6",
    //     status: "Resolved",
    //   };
    //   this.ticketService.updateTicket(ticket_id,payload).subscribe((data: number)=>{
    //     this.singleTicket = data;
    //     this.getAllTicket();
    //   });
    //

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    (dialogConfig.panelClass = 'post-dialog-container'),
      this.dialog.open(UpdateTicketComponent, dialogConfig);

    this.ticketService.getPassTicketValue(ticket);
  }
  checkForAgingTicket(ticket: Ticket) {
    //Sun Dec 04 2022 21:40:33 GMT+0800

    let cont: boolean = false;
    const currentDay = moment();
    const createdAt = moment(ticket.created_at);
    const diff = createdAt.diff(currentDay, 'days');

    if (Math.abs(diff) > 7) {
      cont = true;
    } else cont = false;
    return cont;
  }
  onVerifySlip(ticket: Ticket) {
    console.log(ticket.ticketID);
    this.confirmService
      .getSlipsByUserID(ticket.userID)
      .subscribe((slips: Confirm) => {
        this.confirmSlip = slips['data'];
        for (let i = 0; i < this.confirmSlip.length; i++) {
          if (this.confirmSlip[i].confirmTicket == ticket.ticketID) {
            this.passConfirm = this.confirmSlip[i];
            this.confirmService.getPassConfirmValue(this.passConfirm);
          }
        }
      });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    (dialogConfig.panelClass = 'post-dialog-container'),
      this.dialog.open(VerifySlipComponent, dialogConfig);
  }
}
