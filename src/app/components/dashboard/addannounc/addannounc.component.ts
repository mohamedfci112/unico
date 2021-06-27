import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement.service';
import { Announce } from '../../../models/announce';

@Component({
  selector: 'app-addannounc',
  templateUrl: './addannounc.component.html',
  styleUrls: ['./addannounc.component.css']
})
export class AddannouncComponent implements OnInit {
  item: Announce = {
    title: '',
    description: ''
  };
  manager = false;

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
      this.announceServices.addAnnounce(this.item);
      this.item.title = '';
      this.item.description = '';
    }
  }

}
