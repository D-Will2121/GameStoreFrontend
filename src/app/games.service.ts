import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from './game';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient ) { }

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiServerUrl}/games/all`);
  }
  public getGamesByGenre(genre: String): Observable<Game[]> {
     return this.http.get<Game[]>(`${this.apiServerUrl}/games/all/genre/${genre}`);
   }

}
