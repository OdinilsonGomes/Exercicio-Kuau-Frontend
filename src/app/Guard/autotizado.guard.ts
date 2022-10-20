import { LoginService } from './../pages/login/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AutotizadoGuard implements CanActivate {
  constructor( private loginService: LoginService,private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("IN GUARD");
      if(!this.loginService.getToken()){

        this.router.navigate(['/login']);
        return false;
      }else {
        return true;
      }
  }

}
