import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  islogin = false;
  username;

  constructor() {
    if (localStorage.getItem('user')){
      this.islogin = true;
    }
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('name');
  }

}
