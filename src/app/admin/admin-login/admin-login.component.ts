import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  adminForm: FormGroup = new FormGroup({
    adminKey: new FormControl('', Validators.required),
    adminPassword: new FormControl('', Validators.required),
  });
  onSubmitLogin() {}
}
