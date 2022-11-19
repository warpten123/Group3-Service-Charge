import { MatDialog } from '@angular/material/dialog';
import { UsersService } from './../services/users/users.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Users } from '../services/users/user-interface';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor
  (
    private router: Router,
    private toast: HotToastService,
    private userService: UsersService,
    private dialog: MatDialog,
  ) { }
  isFound: number = 0;
  users: Users[]=[];
  ngOnInit(): void {
   
  }
  onConfirmPassword(){
    this.userService.getAllUsers().subscribe((data: Users[])=>{
      this.users = data;
      for(let i  = 0; i < this.users.length; i++){
        
        if(this.users[i].user_email == this.confirmPasswordForm.value.email){
          this.toast.success("Email Found!");
          this.isFound = 1;
          console.log(this.isFound);
        }else{
          this.isFound = 0;
          console.log("not found");
        }
          
      }
    })
  }

  confirmPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    
  });
  close(){
    this.dialog.closeAll();
  }

}
