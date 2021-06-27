import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement.service';
import { Announce } from '../../../models/announce';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  announces: Announce[];
  // tslint:disable-next-line:no-inferrable-types
  editState: boolean = false;
  itemToEdit: Announce;

  constructor(private announcServices: AnnouncementService) { }

  ngOnInit(): void {
    this.announcServices.getAnnounce().subscribe(announce => {
      this.announces = announce;
    });
  }
  // tslint:disable-next-line:typedef
  deleteAnnounce(event, announce: Announce){
    this.clearState();
    this.announcServices.deleteItem(announce);
  }

  // tslint:disable-next-line:typedef
  editItem(event, announce: Announce){
    this.editState = true;
    this.itemToEdit = announce;
  }

  // tslint:disable-next-line:typedef
  updateItem(announce: Announce){
    this.announcServices.updateItem(announce);
    this.clearState();
  }

  // tslint:disable-next-line:typedef
  clearState(){
    this.editState = false;
    this.itemToEdit = null;
  }

}
