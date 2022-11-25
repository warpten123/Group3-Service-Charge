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
  isFound: boolean = false;
  users: Users[]=[];
  temp: number
  count: number = 0
  bool: boolean[]=[]
  ngOnInit(): void {
    this.confirmPasswordForm.controls['password'].disable()
    this.confirmPasswordForm.controls['confirmPassword'].disable()
    this.userService.getAllUsers().subscribe((data: Users[])=>{
      this.users = data['data'];
    })
  }

  checkEmail(email: string){
      let check = 0
      for(let i  = 0; i < this.users.length; i++){
        this.bool.push(this.users[i].user_email === email)
      }
      for(let i  = 0; i < this.users.length; i++){
        if(this.bool[i] == true){
          check = i
        }
      }
      for(let i  = 0; i < this.users.length; i++){
        if(this.users[check].user_email === email){  
          this.confirmPasswordForm.controls['password'].enable()
          this.confirmPasswordForm.controls['confirmPassword'].enable()
          this.count = check
          this.isFound = true
        }else{
          this.confirmPasswordForm.controls['password'].disable()
          this.confirmPasswordForm.controls['confirmPassword'].disable()
          this.isFound = false
        }
        
      }
      this.bool = []
      return this.isFound
    

  }
  onConfirmPassword(){
    if(!this.confirmPasswordForm.valid){
      this.toast.error("Error Updating Password")
      return
    }
    
         
       if(this.isFound){
        if(this.confirmPasswordForm.value.password == this.confirmPasswordForm.value.confirmPassword){
          this.updatePassword(this.users[this.count])
        }else{
          this.toast.error("Password doesn't match!")
          return
        }
       }
        
          
              
        
        
          
      
  }
  updatePassword(userUpdate: Users){
  
    let updateFormData = new FormData()
    updateFormData.append("user_id",userUpdate.user_id.toString())
    updateFormData.append("user_fname",userUpdate.user_fname.toString())
    updateFormData.append("user_lname",userUpdate.user_lname.toString())
    updateFormData.append("user_email",userUpdate.user_email.toString())
    updateFormData.append("user_username",userUpdate.user_username.toString())
    updateFormData.append("user_password",this.confirmPasswordForm.value.password)
    this.userService.updateUser(updateFormData).pipe(this.toast.observe({
      success: "Password Changed Successfully!",
      loading: "Processing",
      error: (message: any) => `${message}`
    })).subscribe((data: number)=>{
      this.temp = data;
     
    });
  }
  confirmPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  searchForm: FormGroup = new FormGroup({
    emailSearch: new FormControl('', Validators.required), 
  });
  close(){
    this.dialog.closeAll();
  }

}
