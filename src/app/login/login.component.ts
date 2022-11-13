import { UsersService } from './../services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Users } from '../services/users/user-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  constructor( 
    private router: Router,
    private userService: UsersService,
    private toast: HotToastService,
    ) { 

   
  }
  count : number = 0;
  found : boolean = false;
  postUser: Users;
  authen: Users[]=[];
  ngOnInit(): void {  
  }
  loginForm: FormGroup = new FormGroup({
    emailLogin: new FormControl('', Validators.required, ),
    passLogin: new FormControl('', Validators.required)
  });
  registerForm: FormGroup = new FormGroup({
    registerEmailAdd: new FormControl('', Validators.required),
    registerLastName: new FormControl('', Validators.required),
    registerUserName: new FormControl('', Validators.required),
    registerFirstName: new FormControl('', Validators.required),
    registerPassword: new FormControl('', Validators.required)
  });
  onSubmitLogin(){
    
    // if(this.loginForm.invalid){
    //   this.toast.error("Complete your Login!");
    //   return;
    // }
    this.userService.getAllUsers().subscribe((data: Users[])=>{
      this.authen=data;      
    },(error: any)=>{
        this.toast.error(error); 
      });
    this.userService.getUserByEmail(this.loginForm.value.emailLogin).subscribe((data: Users)=>{
      this.postUser = data;
      if(this.postUser.user_password == this.loginForm.value.passLogin  ){
        this.toast.success(`Welcome ${this.postUser.user_fname}!`);
        this.nav("user-dashboard");
      }else{
        this.toast.error("Incorrect Password!");
        return;
      }
      
    },(error: any)=>{
      this.toast.error("Invalid Login"); 
    }); 

    //end subs
    
      
      
      
  }
  onSubmitRegister(){
    if(this.registerForm.invalid){
      this.toast.error("Invalid Registration!");
      return;
    }
    const payload: Users = {
     
      user_email: this.registerForm.value.registerEmailAdd,
      user_lname: this.registerForm.value.registerLastName,
      user_fname: this.registerForm.value.registerFirstName,
      user_username: this.registerForm.value.registerUserName,
      user_password:  this.registerForm.value.registerPassword,
      
    };
    this.userService.saveUser(payload).pipe(this.toast.observe({
      success: "Registered Successfully!",
      loading: "Processing",
      error: (message: any) => `${message}`
    })).subscribe((data: Users) => {
      this.postUser = data;
      this.nav("user-dashboard");
    });
    
    this.registerForm.reset();
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
