import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement.service';
import { CalendarService } from '../../../services/calendar.service';
import { Announce } from '../../../models/announce';
import { Calendar } from '../../../models/calendar';
import { Task } from '../../../components/dashboard/space/task/task';

@Component({
  selector: 'app-dashboardhome',
  templateUrl: './dashboardhome.component.html',
  styleUrls: ['./dashboardhome.component.css']
})
export class DashboardhomeComponent implements OnInit {
  announces: Announce[];
  calendarEvents: Calendar[];
  todoList: Task[];

  constructor(private announcServices: AnnouncementService, private cal: CalendarService) { }

  ngOnInit(): void {
    this.announcServices.getAnnouncelimit().subscribe(announce => {
      this.announces = announce;
    });
    //
    this.cal.getCalendarlimit().subscribe(event => {
      this.calendarEvents = event;
    });
    //
    this.cal.getTodolimit().subscribe(todo => {
      this.todoList = todo;
    });
  }

}
