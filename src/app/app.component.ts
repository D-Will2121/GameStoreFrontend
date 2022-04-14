import { GamesService } from './games.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { EmptyError } from 'rxjs';
import { UsersService } from './users.service';
import { RegistrationService } from './registration.service';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Game } from './game';
import { User } from './user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  
  public games: Game[];
  public actionGames: Game[];
  public lifeGames: Game[];
  public horrorGames: Game[];
  public strategyGames: Game[];
  public newGame: Game;
  public delGame: Game;
  public currentUser: User;
  searchKey: any;
  closeResult: string;
  searchStarted: boolean;
  username:string;
  password:string;
  

  constructor(private gameService: GamesService, private userService: UsersService,
     private regService: RegistrationService, private modalService: NgbModal,
     private el: ElementRef, private router: Router){}
  
    ngOnInit(){
  }

  openAddgame(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'addgameModal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.closeModal(content)}`;
    });
  }

  openEditgame(content: any, game: Game) {
    this.newGame = game;
    this.modalService.open(content, {ariaLabelledBy: 'updategameModal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.closeModal(content)}`;
    });
  }

  onLoginUser(loginForm: NgForm){
    this.regService.login(loginForm.value).subscribe(
      (response: User) => {
        console.log("response success");
                //this.currentUser = response;
      },
      (error: HttpErrorResponse) => {
      alert(error.message);
      }
    );
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
        alert(error.message);
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
