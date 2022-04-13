import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient ) {

   }

  public registerUser(user: User, role: String): Observable<User> {
    const requestOptions: Object = {
    responseType: 'text'
  }
  return this.http.post<User>(`${this.apiServerUrl}/users/registration?role=${role}`, user, requestOptions); 
}
  public login(user: string, password:string): Observable<User>{
    const requestOptions: Object = {
      responseType: 'text',
      Authorization: 'Basic '+btoa(user+":"+password)
    }
   
    return this.http.get<User>(`${this.apiServerUrl}/`, requestOptions);
  }
}
