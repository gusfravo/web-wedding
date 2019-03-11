import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
// import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private session: SessionService, private router: Router) {
    //verificamos si existen variables de session para permitir el reload
    this.session.realodSession().then(data =>{
      if(data){
        // no hacemos nada y permitimos el reload
      }else{
        sessionStorage.clear();
        this.router.navigate(['/home']);
      }
    })
  }

  canActivate(): boolean {
    if (this.session.getLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
