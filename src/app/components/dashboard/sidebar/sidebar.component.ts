import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { UsersInfo } from '../../../models/usersInfo';
import { LogoutForm } from '../../../models/logoutForm';
import { FireSQL } from 'firesql';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userinfo: UsersInfo[];
  logoutFormInfo: LogoutForm[];
  username;
  manager = false;

  constructor(public firebaseservice: FirebaseService, private router: Router) { }

  ngOnInit(): void {
  this.username = localStorage.getItem('email');
  this.firebaseservice.userInfo().subscribe(uinfo => {
    this.userinfo = uinfo;
    // tslint:disable-next-line:typedef
    this.userinfo.forEach(function x(item, index){
      localStorage.setItem('depart', item.department);
      localStorage.setItem('name', item.name);
      localStorage.setItem('type', item.type);
    });
  });
  if (localStorage.getItem('name') === 'Khaled Farouk'){
    this.manager = true;
  }
  }

  // tslint:disable-next-line:typedef
logout() {
    this.firebaseservice.logout();
    this.router.navigate(['/']);
  }

  // tslint:disable-next-line:typedef
finalLogout(text: string) {
    this.firebaseservice.finalLogout(text);
    this.router.navigate(['/login']);
  }

}
