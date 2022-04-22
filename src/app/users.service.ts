import { RegistrationService } from './registration.service';
import { User } from './user';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from './game';
import { environment } from 'src/environments/environment';
import { R3UsedDirectiveMetadata } from '@angular/compiler';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private regService: RegistrationService ) { }

  public purchaseGame(email: String, GameID: Number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/users/buy/${email}/${GameID}`, { headers: { authorization: 
      this.regService.createBasicAuthToken(this.regService.getLoggedInEmail(), this.regService.getLoggedInPassword()) }}
      );
  }

  public addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.apiServerUrl}/games/add`, game);
  }

  public updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.apiServerUrl}/games/update`, game);
  }

  public deleteGameID(gameId: Number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/users/admins/games/delete/id/${gameId}`, { headers: { authorization: 
      this.regService.createBasicAuthToken(this.regService.getLoggedInEmail(), this.regService.getLoggedInPassword()) }}
      );
  }

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiServerUrl}/users/all`);
  }




  
 

}



