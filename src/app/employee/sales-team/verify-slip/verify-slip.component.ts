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
  onSubmitAcceptSlip(confirm: Confirm) {}
}
