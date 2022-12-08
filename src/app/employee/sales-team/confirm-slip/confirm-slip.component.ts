import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UsersService } from 'src/app/services/users/users.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Ticket } from 'src/app/services/ticket/ticket-interface';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { ConfirmnService } from 'src/app/services/confirm/confirmn.service';
import { Confirm } from 'src/app/services/confirm/confirm-interface';
@Component({
  selector: 'app-confirm-slip',
  templateUrl: './confirm-slip.component.html',
  styleUrls: ['./confirm-slip.component.css'],
})
export class ConfirmSlipComponent implements OnInit {
  receivedTicketData: Subject<Ticket>;
  ticket: Ticket;
  con: Confirm;
  constructor(
    private toast: HotToastService,
    private userService: UsersService,
    private router: Router,
    private dialog: MatDialog,
    private ticketService: TicketService,
    private confirmService: ConfirmnService
  ) {
    this.receivedTicketData = this.ticketService.passTicketValue$;
    this.receivedTicketData.subscribe((data: Ticket) => {
      this.ticket = data;
      console.log(`from service: ${this.ticket}`);
    });
  }

  date: Date;
  slipForm: FormGroup = new FormGroup({
    slipAmount: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    var moment = require('moment');
    this.date = moment();
  }

  onSubmitCreateSlip(ticket: Ticket) {
    if (this.slipForm.invalid) {
      this.toast.error('Error Creating Slip!');
      return;
    }
    let slipCreate = new FormData();
    slipCreate.append('confirmDate', this.date.toString());
    slipCreate.append('confirmUser', ticket.userID.toString());
    slipCreate.append('confirmDesc', ticket.description);
    slipCreate.append('confirmTicket', ticket.ticketID.toString());
    slipCreate.append('confirmAmountInt', this.slipForm.value.slipAmount);
    this.confirmService
      .createSlip(slipCreate)
      .pipe(
        this.toast.observe({
          success: 'Slip Created Successfully!',
          loading: 'Processing',
          error: (message: any) => `${message}`,
        })
      )
      .subscribe((data: Confirm) => {
        this.con = data;
        // this.nav('login');
      });
    this.slipForm.reset();
    this.close();
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
  close() {
    this.dialog.closeAll();
  }
  refreshForm() {
    this.slipForm.reset();
  }
}
