import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

   USER_NAME = 'username'
   USER_EMAIL = 'email'
   USER_FUNDS = 'funds'
   USER_USERROLE = 'userrole'
   USER_PASSWORD = 'password'

   CURRENT_USER = null;
   private apiServerUrl = environment.apiBaseUrl;
   public email: any;
   public password: any;
   public userName: any;
   public funds: any;
   public UserRole: any;

 
   constructor(private http: HttpClient) {
 
   }
 
   authentication(email: string, password: string) {
     return this.http.get(`${this.apiServerUrl}/login/`,
       { headers: { authorization: this.createBasicAuthToken(email, password) } }).pipe(map((res) => {
         this.email = email;
         this.password = password;
       }));
   }
 
   createBasicAuthToken(email: string, password: string) {
     return 'Basic ' + window.btoa(email + ":" + password)
   }
 
   saveUserData(email: any, userName: string, funds: number, UserRole: string, password: string) {
     sessionStorage.setItem(this.USER_EMAIL, email);
     sessionStorage.setItem(this.USER_NAME, 'userName');
     sessionStorage.setItem(this.USER_FUNDS, funds?.toString() || '');
     sessionStorage.setItem(this.USER_USERROLE, UserRole);
     sessionStorage.setItem(this.USER_PASSWORD, password);
   }

 
   logout() {
     sessionStorage.removeItem(this.USER_NAME);
     sessionStorage.removeItem(this.USER_EMAIL);
     sessionStorage.removeItem(this.USER_FUNDS);
     sessionStorage.removeItem(this.USER_USERROLE);
     sessionStorage.removeItem(this.USER_PASSWORD);
     this.email = null;
     this.password = null;
   }
 
   isUserLoggedIn() {
     let user = sessionStorage.getItem(this.USER_NAME)
          if (user === null) return false
     return true
   }

   setFunds() {
    let funds = sessionStorage.getItem(this.USER_FUNDS);
    if (funds !== null)
    {
      return parseInt(funds, 10);
    }
    return 0;
   }
 
   getLoggedInName() {
     let user = sessionStorage.getItem(this.USER_NAME)
     if (user === null) return ''
     return user
   }
   getLoggedInEmail() {
    let user = sessionStorage.getItem(this.USER_EMAIL)
    if (user === null) return ''
    return user
  }
   getLoggedInPassword() {
    let user = sessionStorage.getItem(this.USER_PASSWORD)
    if (user === null) return ''
    return user
  }
  public getUser(email: String): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/login/user?email=${email}`);
  }
  

  public registerUser(user: User, role: String): Observable<User> {
    const requestOptions: Object = {
    responseType: 'text'
  }
  return this.http.post<User>(`${this.apiServerUrl}/users/registration?role=${role}`, user, requestOptions); 
  }

}
