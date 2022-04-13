import { User } from './user';
import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from './game';
import { environment } from 'src/environments/environment';
import { R3UsedDirectiveMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient ) { }

  public purchaseGame(UserID: Number, GameID: Number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/users/buy/${UserID}/${GameID}`);
  }

  public addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.apiServerUrl}/games/add`, game);
  }

  public updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.apiServerUrl}/games/update`, game);
  }

  public deleteGameID(gameId: Number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/games/delete/${gameId}`);
  }

  // public deleteGameName(name: String): Observable<void> {
  //   return this.http.delete<void>(`${this.apiServerUrl}/games/delete/${name}`);
  // }

  // public deleteGameYear(year: Number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiServerUrl}/games/delete/${year}`);
  // }

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiServerUrl}/users/all`);
  }



  // public getGamesByYear(year: Number): Observable<Game[]> {
  //   return this.http.get<Game[]>(`${this.apiServerUrl}/users/all/year/${year}`);
  // }

  // public getGamesByName(name: String): Observable<Game[]> {
  //   return this.http.get<Game[]>(`${this.apiServerUrl}/users/all/name/${name}`);
  // }

  // public getGamesByGenre(genre: String): Observable<Game[]> {
  //   return this.http.get<Game[]>(`${this.apiServerUrl}/users/all/name/${genre}`);
  // }


  
 

}



