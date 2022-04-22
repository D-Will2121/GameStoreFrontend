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
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  public games: Game[];
  public actionGames: Game[];
  public gameID: number;
  isLoading: boolean;
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
      }
    );
  }
  public getGamesGenre() {
    this.gameService.getGamesByGenre('action-adventure').subscribe(
      (response: Game[]) => {
        this.actionGames = response;
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
