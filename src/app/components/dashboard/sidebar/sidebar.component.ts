import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { Router } from '@angular/router';
import { UsersInfo } from '../../../models/usersInfo';
import { LogoutForm } from '../../../models/logoutForm';
import { AnnounceNotificationUser } from '../../../models/anouncNotify';
import { Calendar } from '../../../models/calendar';
import { FireSQL } from 'firesql';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { BnNgIdleService } from 'bn-ng-idle';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare var $: any;

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
  reportmanager = false;
  reportshow = false;
  hrreport = false;
  loginDate;
  announceNotify: AnnounceNotificationUser[];
  calendarNotify: Calendar[];
  announcenotificationNumber = 0;
  calendarnotificationNumber = 0;
  allnotificationNumber = 0;
  newCalendarNotify: Calendar[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(public firebaseservice: FirebaseService, private router: Router, private bnIdle: BnNgIdleService, private annoService: AnnouncementService, private calService: CalendarService) { }

  ngOnInit(): void {
  this.calService.getCalendarNotify().subscribe(cal => {
    this.calendarNotify = [];
    this.newCalendarNotify = [];
    this.calendarNotify = cal;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.calendarNotify.length; i++){
      const startDate = new Date(this.calendarNotify[i].start).toLocaleDateString();
      const today = new Date().toLocaleDateString();
      if (startDate === today){
        this.newCalendarNotify.push(this.calendarNotify[i]);
        this.calendarnotificationNumber = this.newCalendarNotify.length;
      }
    }
    localStorage.setItem('notifycalnum', this.calendarnotificationNumber.toString());
    this.calendarNotify = [];
  });
  this.annoService.getAnnounceNotification().subscribe(notify => {
    this.announceNotify = notify;
    this.announcenotificationNumber = this.announceNotify.length;
    localStorage.setItem('notifyannounum', this.announcenotificationNumber.toString());
  });
  $(document).on('click', '.dropdown-menu', (e) => {
    e.stopPropagation();
  });
  //
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
  if (localStorage.getItem('type') === 'manager'){
    this.hrreport = true;
  }
  else if (localStorage.getItem('type') === 'hr'){
    this.hrreport = true;
  }
  else{
    this.hrreport = false;
  }
  if (localStorage.getItem('type') === 'manager'){
    this.reportmanager = true;
  }
  else if (localStorage.getItem('type') === 'dmanager'){
    this.reportmanager = true;
  }
  else{
    this.reportmanager = false;
  }
  if (localStorage.getItem('depart') === 'hr'){
    this.reportshow = true;
  }
  else if (localStorage.getItem('type') === 'manager'){
    this.reportshow = true;
  }
  else if (localStorage.getItem('type') === 'dmanager'){
    this.reportshow = true;
  }
  else{
    this.reportshow = false;
  }
  this.sessionDay();
  const timer = setInterval(() => {
    this.sessionDay();
    console.log('call session...');
  }, 10000);
  clearInterval(timer);

  //
  this.bnIdle.startWatching(3600).subscribe((isTimeout: boolean) => {
    if (isTimeout) {
      this.logout();
    }
  });
  }
  // tslint:disable-next-line:typedef
  announceNotifyDel(item: AnnounceNotificationUser){
    this.annoService.deleteAnnoNotifyItem(item);
  }
  // tslint:disable-next-line:typedef
  calNotifyDel(item: Calendar){
    const index = this.newCalendarNotify.indexOf(item);
    if (index !== -1) { this.newCalendarNotify.splice(index, 1); }
    this.calendarnotificationNumber = this.newCalendarNotify.length - 1;
    if (this.calendarnotificationNumber === -1) { this.calendarnotificationNumber = 0; }
    this.calService.deleteCalNotifyItem(item);
  }
  // tslint:disable-next-line:typedef
  sessionDay(){
    const today = new Date().toLocaleDateString();
    this.loginDate = new Date(localStorage.getItem('loginDate')).toLocaleDateString();
    if (today > this.loginDate){
      this.finalLogout('Automatic logout after 1 day from log in');
      localStorage.removeItem('user');
      localStorage.removeItem('email');
      localStorage.removeItem('loginDate');
      localStorage.removeItem('depart');
      localStorage.removeItem('name');
      localStorage.removeItem('type');
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
    this.router.navigate(['/']);
  }

}
