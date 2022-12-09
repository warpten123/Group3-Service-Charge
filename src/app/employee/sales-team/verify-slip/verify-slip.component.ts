import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject } from 'rxjs/internal/Subject';
import { Confirm } from 'src/app/services/confirm/confirm-interface';
import { ConfirmnService } from 'src/app/services/confirm/confirmn.service';
import { Ticket } from 'src/app/services/ticket/ticket-interface';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-verify-slip',
  templateUrl: './verify-slip.component.html',
  styleUrls: ['./verify-slip.component.css'],
})
export class VerifySlipComponent implements OnInit {
  receivedConfirmData: Subject<Confirm>;
  constructor(
    private toast: HotToastService,
    private userService: UsersService,
    private router: Router,
    private dialog: MatDialog,
    private ticketService: TicketService,
    private confirmService: ConfirmnService,
    private fileService: UploadService
  ) {
    this.receivedConfirmData = this.confirmService.passConfirmValue$;
    this.receivedConfirmData.subscribe((data: Confirm) => {
      this.confirmSlip = data;
      this.urlAmount = this.confirmSlip.confirmAmountPath;
      this.urlSignature = this.confirmSlip.confirmSignatures;
      console.log(`from service: ${this.confirmSlip}`);
    });
  }
  data: number;
  ticket: Ticket;
  confirmSlip: Confirm;
  con: Confirm;
  date: Date;
  imagePath: any;
  urlAmount: any;
  urlSignature: any;
  message: String = '';
  updateTicket: Ticket;
  validImageAmount: boolean = false;
  validImageSignature: boolean = false;
  ngOnInit(): void {}

  onSubmitAcceptSlip(confirm: Confirm) {
    if (this.urlAmount == undefined || this.urlSignature == undefined) {
      this.toast.error('Error Creating Slip!');
      return;
    }

    let slipCreate = new FormData();
    slipCreate.append('confirmID', confirm.confirmID.toString());
    slipCreate.append('confirmDate', confirm.confirmDate);
    slipCreate.append('confirmUser', confirm.confirmUser.toString());
    slipCreate.append('confirmDesc', confirm.confirmDesc);
    slipCreate.append('confirmTicket', confirm.confirmTicket.toString());
    slipCreate.append('confirmAmountInt', confirm.confirmAmountInt.toString());
    slipCreate.append('confirmAmountPath', this.urlAmount);
    slipCreate.append('confirmSignatures', this.urlSignature);
    this.confirmService
      .updateSlip(slipCreate)
      .pipe(
        this.toast.observe({
          success: 'Confirm Slip Verified!',
          loading: 'Processing',
          error: (message: any) => `${message}`,
        })
      )
      .subscribe((data: Confirm) => {
        this.con = data;
        // this.nav('login');
      });
    this.ticketService
      .getTicketByID(confirm.confirmTicket)
      .subscribe((data: Ticket) => {
        this.updateTicket = data['data'];
        this.ticketUpdate(this.updateTicket);
      });

    this.close();
  }
  close() {
    this.dialog.closeAll();
  }
  ticketUpdate(ticket: Ticket) {
    console.log('asd');
    const payload: Ticket = {
      ticketID: ticket.ticketID,
      assignee: ticket.assignee,
      tracker: ticket.tracker,
      description: ticket.description,
      subject: ticket.subject,
      status: 'Accepted',
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
          error: (message: any) => `${message}`,
        })
      )
      .subscribe((data: number) => {
        this.data = data;
      });
    window.location.reload();
  }
}
