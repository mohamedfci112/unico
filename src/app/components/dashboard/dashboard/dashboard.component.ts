import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public firebaseservice: FirebaseService, private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  logout(){
    this.firebaseservice.logout();
    this.router.navigate(['/login']);
  }

}
