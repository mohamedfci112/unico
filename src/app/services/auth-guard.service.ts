import { Injectable } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public firebaseservice: FirebaseService, private router: Router) { }

  // tslint:disable-next-line:typedef
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.firebaseservice.isLoggin && !localStorage.getItem('user')) {
      // redirect to some view explaining what happened
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }
}
