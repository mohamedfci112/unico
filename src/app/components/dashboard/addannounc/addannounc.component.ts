import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement.service';
import { Announce } from '../../../models/announce';
import { AnnounceNotificationUser } from '../../../models/anouncNotify';

@Component({
  selector: 'app-addannounc',
  templateUrl: './addannounc.component.html',
  styleUrls: ['./addannounc.component.css']
})
export class AddannouncComponent implements OnInit {
  item: Announce = {
    title: '',
    description: '',
    date: ''
  };
  notify: AnnounceNotificationUser = {
    title: '',
    user: '',
    isRead: ''
  };
  manager = false;
  cars = ['mohamedbauomy@unico-egypt.com', 'ffarouk@unico-egypt.com', 'kfarouk@unico-egypt.com'];

  constructor(private announceServices: AnnouncementService) { }

  ngOnInit(): void {
    if (localStorage.getItem('name') === 'Khaled Farouk'){
      this.manager = true;
    }
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    // tslint:disable-next-line:triple-equals
    if (this.item.title != '' && this.item.description != ''){
      const creatDate = new Date().toString();
      this.item.date = creatDate;
      this.announceServices.addAnnounce(this.item);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.cars.length; i++){
        this.notify.title = this.item.title;
        this.notify.user = this.cars[i];
        this.notify.isRead = 'false';
        this.announceServices.addNotifyAnnounceForUser(this.notify);
        this.notify.title = '';
        this.notify.user = '';
        this.notify.isRead = '';
      }
      this.item.title = '';
      this.item.description = '';
    }
  }

}
