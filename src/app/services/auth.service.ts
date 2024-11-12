import { Injectable } from '@angular/core';
import { IAuth } from './interfaces/auth/IAuth';
import { IResponse } from './interfaces/api/IResponse';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token?: string;
  private email?: string;
  private url = 'http://localhost:3001/api/auth';

  private tokenName = 'token_dvcs';
  private emailname = 'email_dvcs';


  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ){
    // Mantener la sesion iniciada
    this.token = this.cookieService.get(this.tokenName) || undefined;
    this.email = this.cookieService.get(this.emailname) || undefined;
  }


  private signIn( data: IAuth, url: string ){
    return this.http.post<IResponse<string>>( `${this.url}${url}`, data)
      .pipe(
        tap( data => {
          this.token = data.token;
          this.cookieService.set(this.tokenName, data.token!, {path: '/'});
        }),
        tap( data => {
          this.email = data.data;
          this.cookieService.set(this.emailname, data.data, {path: '/'});
        })
      );
  }

  public login( data: IAuth ):Observable<IResponse<string>>{
    return this.signIn(data, '/login');
  }

  public register( data: IAuth ): Observable<IResponse<string>>{
    return this.signIn(data, '/register');
  }

  public verifyToken(){}

  public get getToken():string | undefined {
    return this.token;
  }

  public get getEmail():string | undefined {
    return this.email;
  }

  public get isLogged():boolean {
    return this.token !== undefined && this.email !== undefined;
  }

  public logout(){
    this.token = undefined;
    this.email = undefined;

    // borrar cookies/localstorage/sessionstorage
    this.cookieService.delete(this.tokenName, '/');
    this.cookieService.delete(this.emailname, '/');
  }

}
