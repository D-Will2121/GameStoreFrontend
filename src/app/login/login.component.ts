import { RegistrationService } from './../registration.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  message:any;

  constructor(private regService: RegistrationService, private router: Router) { }

  ngOnInit(): void {
  }

  doLogin(){
   let response = this.regService.login(this.username,this.password);
   response.subscribe(data=>{
     console.log(data)
   })
  }

  onLoginUser(loginForm: NgForm){
    this.regService.login(loginForm.controls['email'].value, loginForm.controls['password'].value).subscribe(
      (response: User) => {
        this.router.navigate(["/home"])
      },
      (error: HttpErrorResponse) => {
      alert(error.message);
      }
    );
   }

}
