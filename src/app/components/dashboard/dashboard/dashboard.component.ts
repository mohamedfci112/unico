import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DataService} from '../../../services/data.service';
import { CalendarService} from '../../../services/calendar.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Calendar } from '../../../models/calendar';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {DayPilot, DayPilotMonthComponent} from 'daypilot-pro-angular';
declare var $;
declare var Tour;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit  {

  searchString: string;
  monthname;

  @ViewChild('calendar', {static: false}) calendar: DayPilotMonthComponent;

  form: FormGroup;
  form1: FormGroup;
  dateFormat = 'MM/dd/yyyy h:mm tt';

  events: any[] = [];
  agendaEvents: Calendar[] = [];
  updatedText;
  item: Calendar = {
    start: '',
    end: '',
    text: '',
    user: ''
  };
  item1: Calendar = {
    id: '',
    text: ''
  };

  config = {
    startDate: DayPilot.Date.today(),
    eventHeight: 40,
    eventDeleteHandling: 'Update',
    eventResizeHandling : 'Update',
    onBeforeCellRender: args => {
      if (args.cell.start.getDayOfWeek() === 5 || args.cell.start.getDayOfWeek() === 6) {
        args.cell.backColor = 'silver';
      }
      if (args.cell.start <= DayPilot.Date.today() && DayPilot.Date.today() < args.cell.end) {
        args.cell.backColor = '#ffcccc';
    }
    },
    weekStarts: 0,
    onEventClick: args1 => {
      this.form1.setValue({
        id: args1.e.id(),
        name1: args1.e.text()
      });
      $('#modalcalendarupdate').modal('show');
    },
    onEventDeleted: args => {
      this.dss.deleteEvent(args.e.id());
      const date = new Date(args.e.start().value).toDateString();
      const today = new Date().toDateString();
    },

    onTimeRangeSelect: args => {
      this.show(args);
      document.querySelector<HTMLElement>('.cal').style.pointerEvents = 'visible';
      document.querySelector<HTMLElement>('.cal').style.backgroundColor = '#bf1e2d';
      document.querySelector<HTMLElement>('.cal').style.color = 'white';
    }
  };
  // tslint:disable-next-line:typedef
  show(args: any) {
    args.name = '';
    this.form.setValue({
      start: args.start.toString(this.dateFormat),
      end: args.end.toString(this.dateFormat),
      name: ''
    });
  }

  // tslint:disable-next-line:max-line-length
  constructor(public firebaseservice: FirebaseService, private router: Router, private fb: FormBuilder, private dss: DataService, private calser: CalendarService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      start: ['', this.dateTimeValidator(this.dateFormat)],
      end: ['', [Validators.required, this.dateTimeValidator(this.dateFormat)]]
    });
    this.form1 = this.fb.group({
      id: [''],
      name1: ['', Validators.required]
    });
  }

  // tslint:disable-next-line:typedef
  delete(item: Calendar){
    this.calser.deleteCalNotifyItem(item);
  }
  // tslint:disable-next-line:typedef
  dateTimeValidator(format: string) {

    return (c: FormControl) => {
      const valid = !!DayPilot.Date.parse(c.value, format);
      return valid ? null : {badDateTimeFormat: true};
    };
  }
  ngOnInit(): void {
    this.monthname = this.config.startDate;
    this.calser.getCalendar().subscribe(res => {
      this.agendaEvents = res;
    });
  }

  // tslint:disable-next-line:typedef
  update(id: string, txt: string) {
    if (txt !== '') {
      this.item1.id = id;
      this.item1.text = txt;
      this.dss.moveEvent(this.item1);
      document.querySelector<HTMLElement>('.modal').style.display = 'none';
    }
    else{
      alert('Event name is empty!!');
    }
  }
  // tslint:disable-next-line:typedef
  submit() {
    if (this.item.text !== ''){
      this.item.user = localStorage.getItem('email');
      const startDate = new Date(this.item.start);
      const startYear = startDate.getFullYear();
      const startMonth = startDate.getMonth() + 1;
      const startDay = startDate.getDate();
      const starthrs = startDate.getHours();
      //
      const endDate = new Date(this.item.end);
      const endYear = endDate.getFullYear();
      const endMonth = endDate.getMonth() + 1;
      const endDay = endDate.getDate();
      const endhrs = endDate.getHours();
      if (startMonth < 10){
        if (starthrs < 10){
          if (startDay < 10){
            // tslint:disable-next-line:max-line-length
          this.item.start = startYear.toString().concat('-', '0', startMonth.toString(), '-', '0', startDay.toString(), ' ', '0', starthrs.toString(), ':', '00', ':', '00');
          }
          else{
            // tslint:disable-next-line:max-line-length
          this.item.start = startYear.toString().concat('-', '0', startMonth.toString(), '-', startDay.toString(), ' ', '0', starthrs.toString(), ':', '00', ':', '00');
          }
        }
        else{
          if (startDay < 10){
            // tslint:disable-next-line:max-line-length
            this.item.start = startYear.toString().concat('-', '0', startMonth.toString(), '-', '0', startDay.toString(), ' ', starthrs.toString(), ':', '00', ':', '00');
          }
          else{
            // tslint:disable-next-line:max-line-length
            this.item.start = startYear.toString().concat('-', '0', startMonth.toString(), '-', startDay.toString(), ' ', starthrs.toString(), ':', '00', ':', '00');
          }
        }
      }
      else{
        if (starthrs < 10){
          if (startDay < 10){
            // tslint:disable-next-line:max-line-length
            this.item.start = startYear.toString().concat('-', startMonth.toString(), '-', '0', startDay.toString(), ' ', '0', starthrs.toString(), ':', '00', ':', '00');
          }
          else{
            // tslint:disable-next-line:max-line-length
            this.item.start = startYear.toString().concat('-', startMonth.toString(), '-', startDay.toString(), ' ', '0', starthrs.toString(), ':', '00', ':', '00');
          }
        }
        else{
          if (startDay < 10){
            // tslint:disable-next-line:max-line-length
            this.item.start = startYear.toString().concat('-', startMonth.toString(), '-', '0', startDay.toString(), ' ', starthrs.toString(), ':', '00', ':', '00');
          }
          else{
            this.item.start = startYear.toString().concat('-', startMonth.toString(), '-', startDay.toString(), ' ', starthrs.toString(), ':', '00', ':', '00');
          }
        }
      }
      if (endMonth < 10){
        if (endhrs < 10){
          if (endDay < 10){
            // tslint:disable-next-line:max-line-length
          this.item.end = endYear.toString().concat('-', '0', endMonth.toString(), '-', '0', endDay.toString(), ' ', '0', endhrs.toString(), ':', '00', ':', '00');
          }
          else{
            // tslint:disable-next-line:max-line-length
          this.item.end = endYear.toString().concat('-', '0', endMonth.toString(), '-', endDay.toString(), ' ', '0', endhrs.toString(), ':', '00', ':', '00');
          }
        }
        else{
          if (endDay < 10){
            // tslint:disable-next-line:max-line-length
          this.item.end = endYear.toString().concat('-', '0', endMonth.toString(), '-', '0', endDay.toString(), ' ', endhrs.toString(), ':', '00', ':', '00');
          }
          else{
            // tslint:disable-next-line:max-line-length
          this.item.end = endYear.toString().concat('-', '0', endMonth.toString(), '-', endDay.toString(), ' ', endhrs.toString(), ':', '00', ':', '00');
          }
        }
      }
      //
      else{
        if (endhrs < 10){
          if (endDay < 10){
            // tslint:disable-next-line:max-line-length
          this.item.end = endYear.toString().concat('-', endMonth.toString(), '-', '0', endDay.toString(), ' ', '0', endhrs.toString(), ':', '00', ':', '00');
          }
          else{
            // tslint:disable-next-line:max-line-length
          this.item.end = endYear.toString().concat('-', endMonth.toString(), '-', endDay.toString(), ' ', '0', endhrs.toString(), ':', '00', ':', '00');
          }
        }
        else{
          if (endDay < 10){
            // tslint:disable-next-line:max-line-length
          this.item.end = endYear.toString().concat('-', endMonth.toString(), '-', '0', endDay.toString(), ' ', endhrs.toString(), ':', '00', ':', '00');
          }
          else{
            // tslint:disable-next-line:max-line-length
          this.item.end = endYear.toString().concat('-', endMonth.toString(), '-', endDay.toString(), ' ', endhrs.toString(), ':', '00', ':', '00');
          }
        }
      }
      document.querySelector<HTMLElement>('.modal').style.display = 'none';
      this.dss.createEvent(this.item);
      this.item.text = 'New Event';
      this.item.start = '09/08/2021 12:00 AM';
      this.item.end = '09/08/2021 12:00 AM';
      this.item.user = '';
      document.querySelector<HTMLElement>('.cal').style.pointerEvents = 'none';
      document.querySelector<HTMLElement>('.cal').style.backgroundColor = '#3c78d8';
      document.querySelector<HTMLElement>('.cal').style.color = 'white';
      this.calendar.control.clearSelection();
    }
  }

  // tslint:disable-next-line:typedef
  viewChange() {
    // tslint:disable-next-line:max-line-length
    this.dss.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd()).subscribe(result => this.events = result);
  }
  navigatePrevious(event): void {
    event.preventDefault();
    this.config.startDate = (this.config.startDate as DayPilot.Date).addDays(-30);
    this.monthname = this.config.startDate;
  }

  navigateNext(event): void {
    event.preventDefault();
    this.config.startDate = (this.config.startDate as DayPilot.Date).addDays(30);
    this.monthname = this.config.startDate;
  }

  navigateToday(event): void {
    event.preventDefault();
    this.config.startDate = DayPilot.Date.today();
  }

  // tslint:disable-next-line:typedef
  calendarInstructions(){
    // Instance the tour
const tourcalender = new Tour({
  debug: true,
  storage: false,
  backdrop: true,
  framework: 'bootstrap4',
    steps: [
    {
      element: '#calend',
      title: 'Calendar',
      content: 'Here the calendar box, please drag or click on the day box first before click on Add Event button!'
    },
    {
      element: '#addEventBtn',
      title: 'Add Event',
      content: 'To add an event must drag or click on the calendar then click on Add Event button When it glows red!'
    },
    {
      element: '#agendaBtn',
      title: 'All your events',
      content: 'Here You will find all your events and you can search for any event name!'
    }
],
});
// Initialize the tour
// tour.init();
tourcalender.start();
localStorage.setItem('calInstruction', 'yes');
  }
  ngAfterViewInit(): void {
    if (localStorage.getItem('calInstruction') !== 'yes') {
      this.calendarInstructions();
    }

    // tslint:disable-next-line:quotemark
    // $("div:contains('DEMO')").css("color", "#FF6600");
    // tslint:disable-next-line:max-line-length
    this.dss.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd()).subscribe(result => this.events = result);
  }

  // tslint:disable-next-line:typedef
  logout(){
    this.firebaseservice.logout();
    this.router.navigate(['/login']);
  }

}
