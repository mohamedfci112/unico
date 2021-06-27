import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement.service';
import { Announce } from '../../../models/announce';

@Component({
  selector: 'app-dashboardhome',
  templateUrl: './dashboardhome.component.html',
  styleUrls: ['./dashboardhome.component.css']
})
export class DashboardhomeComponent implements OnInit {
  announces: Announce[];

  constructor(private announcServices: AnnouncementService) { }

  ngOnInit(): void {
    this.announcServices.getAnnouncelimit().subscribe(announce => {
      this.announces = announce;
    });
  }

}
