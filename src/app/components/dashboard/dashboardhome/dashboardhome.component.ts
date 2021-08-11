import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement.service';
import { CalendarService } from '../../../services/calendar.service';
import { TodoService } from '../../../services/todo.service';
import { Announce } from '../../../models/announce';
import { Calendar } from '../../../models/calendar';
import { Todo } from '../../../models/todo';
import { Task } from '../../../components/dashboard/space/task/task';

@Component({
  selector: 'app-dashboardhome',
  templateUrl: './dashboardhome.component.html',
  styleUrls: ['./dashboardhome.component.css']
})
export class DashboardhomeComponent implements OnInit {
  announces: Announce[];
  calendarEvents: Calendar[];
  todoList: Todo[];

  constructor(private announcServices: AnnouncementService, private cal: CalendarService, private todoServices: TodoService) { }

  // tslint:disable-next-line:typedef
  validDateFormat(dateString) {
  if (dateString) {
    return dateString.replace(/\s/, 'T');
  }

  return null;
}
// tslint:disable-next-line:typedef
alterCheck(event, announce: Todo) {
  announce.isChecked = !announce.isChecked;
  this.todoServices.checkOrUnCheckTitle(announce);
}
  ngOnInit(): void {
    this.announcServices.getAnnouncelimit().subscribe(announce => {
      this.announces = announce;
    });
    //
    this.cal.getCalendarlimit().subscribe(event => {
      this.calendarEvents = event;
    });
    //
    this.todoServices.getAnnounceLimit().subscribe(todo => {
      this.todoList = todo;
    });
  }

}
