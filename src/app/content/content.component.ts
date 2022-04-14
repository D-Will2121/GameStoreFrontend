import { GamesService } from './../games.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Game } from '../game';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { UsersService } from '../users.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
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
    // else{
    //   var num = this.searchKey;
    //   console.log(num);
      
    //   this.actionGames = this.actionGames.filter(gameService =>
    //     {
    //     return gameService.year == num;
    //     })
    // }
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

  

}
