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
import { UploadService } from 'src/app/services/upload/upload.service';
@Component({
  selector: 'app-client-view-slip',
  templateUrl: './client-view-slip.component.html',
  styleUrls: ['./client-view-slip.component.css'],
})
export class ClientViewSlipComponent implements OnInit {
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
  slipForm: FormGroup = new FormGroup({
    slipAmount: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    var moment = require('moment');
    this.date = moment();
  }

  onSubmitUpdateSlip(confirm: Confirm) {
    // if (this.slipForm.invalid) {
    //   this.toast.error('Error Creating Slip!');
    //   return;
    // }
    this.onFileUploadAmount(confirm);
    this.onFileUploadSignature(confirm);
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
          success: 'Slip Updated Successfully!',
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

    this.slipForm.reset();
    this.close();
  }

  ticketUpdate(ticket: Ticket) {
    const payload: Ticket = {
      ticketID: ticket.ticketID,
      assignee: ticket.assignee,
      tracker: ticket.tracker,
      description: ticket.description,
      subject: ticket.subject,
      status: 'Waiting for Confirmation',
    };
    let formData = new FormData();
    formData.append('ticketID', payload.ticketID.toString());
    formData.append('assignee', payload.assignee);
    formData.append('tracker', payload.tracker);
    formData.append('description', payload.description);
    formData.append('subject', payload.subject);
    formData.append('status', payload.status);

    this.ticketService.updateTicket(ticket.ticketID, formData).pipe(
      this.toast.observe({
        error: (message: any) => `${message}`,
      })
    );
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
  onFileChangedAmount(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.urlAmount = reader.result;
      this.validImageAmount = true;
      this.confirmSlip.confirmAmountPath = this.urlAmount;
    };
  }
  onFileUploadAmount(confirm: Confirm) {
    console.log(this.urlAmount);
    let fileUploadForm = new FormData();
    let one = 1;
    // fileUploadForm.append('file_id', one.toString());
    fileUploadForm.append('ticketID', confirm.confirmTicket.toString());
    fileUploadForm.append('type', 'Amount');
    fileUploadForm.append('path', this.urlAmount);
    this.fileService.uploadFile(fileUploadForm).subscribe((message: any) => {
      this.message = message;
      console.log(this.message);
    });
  }
  onFileChangedSignature(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.urlSignature = reader.result;
      this.validImageSignature = true;
      this.confirmSlip.confirmSignatures = this.urlSignature;
    };
  }
  onFileUploadSignature(confirm: Confirm) {
    let fileUploadForm = new FormData();
    let one = 1;
    // fileUploadForm.append('file_id', one.toString());
    fileUploadForm.append('ticketID', confirm.confirmTicket.toString());
    fileUploadForm.append('type', 'Signature');
    fileUploadForm.append('path', this.urlAmount);
    this.fileService.uploadFile(fileUploadForm).subscribe((message: any) => {
      this.message = message;
      console.log(this.message);
    });
  }
}
