import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs'

import { HttpClient, HttpHeaders } from '@angular/common/http'
 
import { CookieService } from "ngx-cookie-service";
import { Usuario } from 'src/app/models.entity/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url:string = 'http://localhost:8081/api/v1/QW/usuarios'

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
  private cookieService:CookieService) { }
  
  public login(username:string, password:string){
    const headers = new HttpHeaders({Authorization: 'Basic '+btoa(username+":"+password)});
    this.registerLoginInStorage(username,password);
    return this.http.get('http://localhost:8081/api/v1/QW/r', {headers , responseType:'text' as 'json'});
  }
  registerLoginInStorage(username:string, password:string){
    this.logout();
    this.cookieService.set('username', username);
    this.cookieService.set('password', password);
  }
  public logout():void{
    this.cookieService.deleteAll();
    if(this.cookieService.check('username')){
      this.cookieService.deleteAll();
      console.log('tdv hay');
      this.cookieService.delete('username');
    };
    this.cookieService.deleteAll();
    if(this.cookieService.check('password')){
      this.cookieService.deleteAll();
      console.log('tdv ha cvdsaf');
      this.cookieService.delete('password');
    };
    this.cookieService.deleteAll();
  }
  public getUser():Observable<Usuario>{
    let username:string = this.cookieService.get('username');
    const headers:HttpHeaders = this.headers();
    return this.http.get<Usuario>(`http://localhost:8081/api/v1/QW/usuario/${username}`, {headers});
  }

  headers():HttpHeaders{
    let username:string = this.cookieService.get('username');
    let password:string = this.cookieService.get('password');
    return new HttpHeaders({Authorization: 'Basic '+btoa(username+":"+password)});
  }
}
