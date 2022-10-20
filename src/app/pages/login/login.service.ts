import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loginModel } from 'src/app/Model/loginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public userLogado: loginModel = null;
  jwtPayload: any;
  constructor(private http: HttpClient) { }


  private readonly urlbase= environment['endPoint'];

  Logar(objecto:any): Observable<any> {

    try{
          const response= this.http.post<any>(`${this.urlbase}/${"auth"}`,objecto);

      return response;

    }catch(error){
      console.error('login-error', error);
    }

   }
   getUserStorage(){
    return localStorage.getItem('userLogado');
   }
   setUserStorage(login:loginModel){
    localStorage.setItem('userLogado',JSON.stringify(login));
   }
  public setToken(token: any) {
    this.jwtPayload = "";//this.jwtHelper.decodeToken(token);
    localStorage.setItem('Token', token.access_token);
    environment.basicAuthorization=token.token_type+' '+token.access_token;
  }

  public getToken() {
    const token = localStorage.getItem('Token');
    return token;
  }

   clearUserStorage(){
    localStorage.clear();
   }

}
