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
  templateUrl: './sliceoflife.component.html',
  styleUrls: ['./sliceoflife.component.css']
})
export class SliceoflifeComponent implements OnInit {
  public games: Game[];
  public lifeGames: Game[];
  public newGame: Game;
  public delGame: Game;
  searchKey: any;
  closeResult: string;
  searchStarted: boolean;
 

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
    this.gameService.getGamesByGenre('life').subscribe(
      (response: Game[]) => {
        this.lifeGames = response;
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
      this.lifeGames = this.lifeGames.filter(gameService =>
        {
        return gameService.name.toLocaleLowerCase().match(this.searchKey.toLocaleLowerCase());
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

  

}
