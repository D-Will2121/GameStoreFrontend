import { GamesService } from './../games.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Game } from '../game';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { UsersService } from '../users.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-content',
  templateUrl: './horror.component.html',
  styleUrls: ['./horror.component.css']
})
export class HorrorComponent implements OnInit {
  public games: Game[];
  public horrorGames: Game[];
  public newGame: Game;
  public delGame: Game;
  searchKey: any;
  closeResult: string;
  searchStarted: boolean;
  gameID: number;
  isLoading: boolean;

 

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
      }
    );
  }
  public getGamesGenre() {
    this.gameService.getGamesByGenre('horror').subscribe(
      (response: Game[]) => {
        this.horrorGames = response;
      },
      (error: HttpErrorResponse) => {
      }
    );
  }

  public buyGames(id: number): void {
    this.isLoading = true;
    let email = this.regService.getLoggedInEmail();
    this.userService.purchaseGame(email, id).subscribe(
      async (response: User) => {
      let user = response;
      await this.regService.saveUserData(user?.email, user?.name, user?.cash, user?.userRole, user?.password)
      this.getGamesGenre();
      this.router.navigate(['/']);
      window.location.reload();
    },
    (error: HttpErrorResponse) => {
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
      this.horrorGames = this.horrorGames.filter(gameService =>
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

  openBuyGame(content: any, id: number){
    this.gameID = id;
    this.modalService.open(content, {ariaLabelledBy: 'buyGame'}).result.then((result) => {
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
