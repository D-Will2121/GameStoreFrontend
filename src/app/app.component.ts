import { GamesService } from './games.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { EmptyError } from 'rxjs';
import { UsersService } from './users.service';
import { RegistrationService } from './registration.service';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Game } from './game';
import { User } from './user';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, mergeMap } from 'rxjs/operators'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  
  user: User;
  email: string;
  funds: any;
  password : string;
  username: string;
  errorMessage = 'Invalid Credentials';
  searchKey: any;
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  closeResult: string;
  isLoggedIn = false;
  

  constructor(private gameService: GamesService, private userService: UsersService,
     private regService: RegistrationService, private http: HttpClient, 
     private modalService: NgbModal, private router: Router, private route: ActivatedRoute){   
     }
    ngOnInit(){
      this.isLoggedIn = this.regService.isUserLoggedIn();
      this.funds = this.regService.setFunds();
      this.username = this.regService.getLoggedInName();
      this.email = this.regService.getLoggedInEmail();



    }
  


  


  // openAddgame(content: any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'addgameModal'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.closeModal(content)}`;
  //   });
  // }

  // openEditgame(content: any, game: Game) {
  //   this.newGame = game;
  //   this.modalService.open(content, {ariaLabelledBy: 'updategameModal'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.closeModal(content)}`;
  //   });
  // }

  onLoginUser(){
    this.regService.authentication(this.email, this.password).pipe(mergeMap(
      params => this.regService.getUser(this.email))).subscribe(
        (result: User) => {
          this.user = result;
        this.regService.saveUserData(this.user?.email, this.user?.name, this.user?.cash, this.user?.userRole, this.user?.password);
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful.';
        this.isLoggedIn = true;
        this.router.navigate(['/']);
        window.location.reload();
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;

    });      
  }
  

  logoutUser() {
    this.regService.logout();
    this.router.navigate(['/']);
    window. location. reload();
  }

  getAuthenticatedUser(email: string){
    this.regService.getUser(email).subscribe(
      (response) => {
        this.user = response;
        this.regService.saveUserData(this.user?.email, this.user?.name, this.user?.cash, this.user?.userRole, this.user?.password);
      }, () => {
      });       
  }

  openLoginUser(content: any){
    this.modalService.open(content, {ariaLabelledBy: 'loginUser'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.closeModal(content)}`;
    });
  }

  public onRegisterUser(addForm: NgForm, role: string): void {
    document.getElementById('register-user-form')?.click();
    this.regService.registerUser(addForm.value, role).subscribe(
      (response: User) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
      }
    );
  }


   openRegisterUser(content: any){
    this.modalService.open(content, {ariaLabelledBy: 'newUser'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.closeModal(content)}`;
    });
  }

  
  private closeModal(reason: any) : string{
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
