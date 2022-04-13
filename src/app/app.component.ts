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
  searchKey: any;
  closeResult: string;
  searchStarted: boolean;
  username:string;
  password:string;
  

  constructor(private gameService: GamesService, private userService: UsersService,
     private regService: RegistrationService, private modalService: NgbModal,
     private el: ElementRef, private router: Router){}
  
  ngOnInit(){
    this.getGamesGenre();
  }

  public test(name: string): void {
    alert(name);
  }

  public getGames() {
    this.gameService.getGames().subscribe(
      (response: Game[]) => {
        return response;
      },
      (error: HttpErrorResponse) => {
      alert(error.message);
      }
    );
  }
  public getGamesGenre() {
    this.gameService.getGamesByGenre('action-adventure').subscribe(
      (response: Game[]) => {
        this.actionGames = response;
      },
      (error: HttpErrorResponse) => {
      alert(error.message);
      }
    );
    this.gameService.getGamesByGenre('horror').subscribe(
      (response: Game[]) => {
        this.horrorGames = response;
      },
      (error: HttpErrorResponse) => {
      alert(error.message);
      }
    );
    this.gameService.getGamesByGenre('strategy').subscribe(
      (response: Game[]) => {
        this.strategyGames = response;
      },
      (error: HttpErrorResponse) => {
      alert(error.message);
      }
    );
    this.gameService.getGamesByGenre('slice-of-life').subscribe(
      (response: Game[]) => {
        this.lifeGames = response;
      },
      (error: HttpErrorResponse) => {
      alert(error.message);
      }
    );
  }

  onLoginUser(loginForm: NgForm){
    this.regService.login(loginForm.controls['email'].value, loginForm.controls['password'].value).subscribe(
      (response: User) => {
        //this.router.navigate(["/home"])
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

  // public getGamesByContent(content: any): void {
  //   if (isNaN(content))
  //   {
  //     this.gameService.getGamesByName(content).subscribe(
  //       (response: Game[]) => {
  //         this.games = response;
  //       },
  //       (error: HttpErrorResponse) => {
  //       alert(error.message);
  //       }
  //     );  
  //   }
  //   else if(!isNaN(content))
  //   {
  //     this.gameService.getGamesByYear(content).subscribe(
  //       (response: Game[]) => {
  //         this.games = response;
  //       },
  //       (error: HttpErrorResponse) => {
  //       alert(error.message);
  //       }
  //     );
  //   }  
  // }

  public onAddgame(addForm: NgForm): void {
    document.getElementById('add-game-form')?.click();
    this.userService.addGame(addForm.value).subscribe(
      (response: Game) => {
        console.log(response);
        this.getGames();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /*public onUpdategame(game: Game, content: any): void {
    this.gameService.updateGame(game).subscribe(
      (response: Game) => {
        console.log(response);
        this.getgames();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
     );
  }*/

  public onDeletegame(gameId: number): void {
    this.userService.deleteGameID(gameId).subscribe(
      (response: void) => {
        console.log(response);
        this.getGames();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
     );
  }

  public searchGames(): void {
    if(this.searchKey == "")
    {
      this.ngOnInit();
    }
    else if(isNaN(this.searchKey))
    {
      this.actionGames = this.actionGames.filter(gameService =>
        {
        return gameService.name.toLocaleLowerCase().match(this.searchKey.toLocaleLowerCase());
        })
    }
    else{
      this.actionGames = this.actionGames.filter(gameService =>
        {
        return gameService.year == this.searchKey;
        })
    }
  }

  public searchGamesGenre(text: String): void {
    const game = this.games;
    if (this.searchStarted)
    {
      this.searchStarted = false;
      this.ngOnInit();
    }
    else
      this.searchStarted = true;
      this.games = this.games.filter(gameService =>
      {
      return gameService.genre.toLocaleLowerCase().match(text.toLocaleLowerCase());
      })
  }

  public searchGamesRating(num: number): void {
    const game = this.games;
    if (this.searchStarted)
    {
      this.searchStarted = false;
      this.ngOnInit();
    }
    else
      this.searchStarted = true;
      this.games = this.games.filter(gameService =>
      {
      return gameService.rating == num
      })
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
