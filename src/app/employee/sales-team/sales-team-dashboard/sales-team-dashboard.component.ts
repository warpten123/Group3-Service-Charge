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
  data: number;
  constructor(
    private userService: UsersService,
    private ticketService: TicketService,
    private dialog: MatDialog,
    private router: Router,
    private confirmService: ConfirmnService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.finalTickets.length = 0;
    this.userService.getAllUsers().subscribe(
      (data: Users[]) => {
        this.users = data['data'];
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].is_logged_in === 'true') {
            this.bindUser = this.users[i];
            this.getAllTickets(this.bindUser);
          }
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
    ///idk wtf is going on here but reload the page once
    var urlParams = [];
    window.location.search
      .replace('?', '')
      .split('&')
      .forEach(function (e, i) {
        var p = e.split('=');
        urlParams[p[0]] = p[1];
      });

    // We have all the params now -> you can access it by name
    console.log(urlParams['loaded']);

    if (urlParams['loaded']) {
    } else {
      let win = window as any;
      win.location.search = '?loaded=1';
      //win.location.reload('?loaded=1');
    }

    // var myVar = setTimeout(() => this.refresh(), 1000);
    // clearTimeout(myVar);
  }

  refresh() {
    console.log('rfresh');
    window.location.reload();
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
  getAllTickets(user: Users) {
    console.log(user.user_id);
    this.ticketService.getAllTickets().subscribe(
      (data: Ticket[]) => {
        this.tickets = data['data'];
        for (let i = 0; i < this.tickets.length; i++) {
          if (this.tickets[i].assignee == user.user_lname) {
            this.finalTickets.push(this.tickets[i]);
          }
        }
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
  resolveTicket(ticket: Ticket) {
    const payload: Ticket = {
      ticketID: ticket.ticketID,
      assignee: ticket.assignee,
      tracker: ticket.tracker,
      description: ticket.description,
      subject: ticket.subject,
      status: 'Resolved',
    };
    let formData = new FormData();
    formData.append('ticketID', payload.ticketID.toString());
    formData.append('assignee', payload.assignee);
    formData.append('tracker', payload.tracker);
    formData.append('description', payload.description);
    formData.append('subject', payload.subject);
    formData.append('status', payload.status);

    this.ticketService
      .updateTicket(ticket.ticketID, formData)
      .pipe(
        this.toast.observe({
          success: 'Ticket Resolved!',
          error: (message: any) => `${message}`,
        })
      )
      .subscribe((data: number) => {
        this.data = data;
      });
    window.location.reload();
  }
}
