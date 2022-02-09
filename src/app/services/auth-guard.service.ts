import {ActivatedRouteSnapshot, CanActivate,  Router, RouterState, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuardService implements CanActivate {

  constructor(private authservice : AuthService,private router : Router){}

  canActivate(
    route:ActivatedRouteSnapshot,
    state : RouterStateSnapshot
  ):Observable<boolean> | Promise<boolean> | boolean {
        if (this.authservice.isAuth){
          return true;
        }else{
          this.router.navigate(['']);
        }
  }

}
