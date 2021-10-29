import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  issignin = false;

  constructor(public firebaseservice: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null){
      this.issignin = true;
    }
    else{
      this.issignin = false;
    }

  }

  // tslint:disable-next-line:typedef
  async onSignup(email: string, password: string){
    await this.firebaseservice.signup(email, password);
    if (this.firebaseservice.isLoggin){
      this.issignin = true;
      this.router.navigate(['/dashboardhome']);
    }
  }

  // tslint:disable-next-line:typedef
  async onSignIn(email: string, password: string){
    await this.firebaseservice.signin(email, password);
    if (this.firebaseservice.isLoggin){
        this.issignin = true;
        // this.router.navigate(['/dashboardhome']);
        window.location.href = '/dashboardhome';
      }
  }

}
