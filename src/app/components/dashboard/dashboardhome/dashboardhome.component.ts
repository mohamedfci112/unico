import { Component, Inject, OnInit, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AnnouncementService } from '../../../services/announcement.service';
import { CalendarService } from '../../../services/calendar.service';
import { TodoService } from '../../../services/todo.service';
import { NotesService } from '../../../services/notes.service';
import { Announce } from '../../../models/announce';
import { Calendar } from '../../../models/calendar';
import { Todo } from '../../../models/todo';
import { Task } from '../../../components/dashboard/space/task/task';
import { Router, NavigationStart } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
declare var $;
declare var Tour;
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboardhome',
  templateUrl: './dashboardhome.component.html',
  styleUrls: ['./dashboardhome.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class DashboardhomeComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel', { static: true }) carousele: NgbCarousel;
  announces: Announce[];
  announceDet: Announce[] = [];
  calendarEvents: Calendar[];
  todoList: Todo[];
  totalEvents = 0;
  totalTodo = 0;
  visitorName = '';

  constructor(private announcServices: AnnouncementService, private cal: CalendarService,
              private todoServices: TodoService, private notesServices: NotesService, private router: Router,
              private renderer2: Renderer2, @Inject(DOCUMENT) private document: Document,
              config: NgbCarouselConfig) {
                // customize default values of carousels used by this component tree
    config.interval = 1000000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
              }

                // tslint:disable-next-line:typedef
  prevSlide() {
    this.carousele.prev();
  }

  // tslint:disable-next-line:typedef
  nextSlide() {
    this.carousele.next();
  }

  // tslint:disable-next-line:typedef
  stopSlider() {
    this.carousele.pause();
  }

  // tslint:disable-next-line:typedef
  getAnnouDet(id: string){
    //
    this.announceDet = [];
    this.announcServices.getAnnounceDet(id).subscribe(anndet => {
      this.announceDet = [];
      this.announceDet = anndet;
      console.log(this.announceDet);
    });
  }
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
    //
    this.cal.getCalendar().subscribe(e => {
      this.totalEvents = e.length;
    });
    this.todoServices.getAnnounce().subscribe(t => {
      this.totalTodo = t.length;
    });
    //
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
  // tslint:disable-next-line:typedef
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  // tslint:disable-next-line:typedef
  dashboardhomeInstructions(){
    // Instance the tour
const tourcalender = new Tour({
  debug: true,
  storage: false,
  framework: 'bootstrap4',
  steps: [

    {
      element: '#form',
      title: 'Forms',
      content: 'Now you can preview or print any important form from here!'
    },
    {
      element: '#manual',
      title: 'Manuals',
      // tslint:disable-next-line:quotemark
      content: "Here you will find Unico's company manual."
    },
    {
      element: '#regulation',
      title: 'Regulations',
      // tslint:disable-next-line:quotemark
      content: "Here you will find Unico's work regulations."
    },
    {
      element: '#space',
      title: 'Your Workspace',
      // tslint:disable-next-line:quotemark
      content: "Your virtual desk is here.. keep notes, create to-do lists and use the calendar to keep track of important events."
    },
    {
      element: '#notification',
      title: 'Notifications',
      content: 'Notification of new announcements or events will appear here once logged in.'
    },
    {
      element: '#nameuser',
      title: 'Sitting',
      content: 'Here you can logout or change your password.'
    },
    {
      element: '#add-todo',
      title: 'To-do List',
      content: 'Here you will see the latest added items of your to-do list.'
    },
    {
      element: '#add-ev',
      title: 'Calendar Events',
      content: 'Here you will find upcoming events on your dashboard.'
    }

],
});
// Initialize the tour
// tour.init();
tourcalender.start();
localStorage.setItem('dashboardHomeInstruction', 'yes');
  }
  // tslint:disable-next-line:typedef
  openModal(){
    document.querySelector<HTMLElement>('#demo-modal').style.display = 'block';
    document.querySelector<HTMLElement>('#demo-modal').style.visibility = 'visible';
    document.querySelector<HTMLElement>('#demo-modal').style.opacity = '1';
    localStorage.setItem('visit', 'yes');
  }
  // tslint:disable-next-line:typedef
  close(){
    document.querySelector<HTMLElement>('#demo-modal').style.display = 'none';
    document.querySelector<HTMLElement>('#demo-modal').style.visibility = 'hidden';
    document.querySelector<HTMLElement>('#demo-modal').style.opacity = '0';
    document.querySelector<HTMLElement>('#demo-modal').style.transition = '0.5s';
  }
  ngAfterViewInit(): void {
    if (localStorage.getItem('dashboardHomeInstruction') !== 'yes' && !this.isMobile()) {
      setTimeout(() => {
        this.dashboardhomeInstructions();
      }, 8000);
    }
    if (localStorage.getItem('visit') !== 'yes'){
      setTimeout(() => {
        this.visitorName = localStorage.getItem('name');
        this.openModal();
      }, 7000);
    }
    const offsetHeight = document.querySelector<HTMLElement>('.go').offsetHeight;
    console.log(offsetHeight);
    if (offsetHeight > 100){
      document.querySelector<HTMLElement>('.go').style.height = '50px';
    }
  }

}
