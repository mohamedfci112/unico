import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/dashboard/sidebar/sidebar.component';
declare var $;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  islogin = false;
  username;
  allnotify = 0;

  constructor() {
    if (localStorage.getItem('user')){
      this.islogin = true;
    }
  }
  // tslint:disable-next-line:typedef
  openMail(){
    window.open('mailto:test@example.com?subject=subject&body=body');
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('name');
    const announum = localStorage.getItem('notifyannounum');
    const calnum = localStorage.getItem('notifycalnum');
    // tslint:disable-next-line:radix
    this.allnotify = parseInt(announum) + parseInt(calnum);
  }

}
