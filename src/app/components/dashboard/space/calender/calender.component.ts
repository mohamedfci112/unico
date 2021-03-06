import {Component, ViewChild, OnInit, EventEmitter, Output, AfterViewInit} from '@angular/core';
import {DayPilot, DayPilotCalendarComponent, DayPilotModalComponent} from 'daypilot-pro-angular';
import {MoveEventParams, DataService} from '../../../../services/data.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateEventParams} from '../../../../services/data.service';
import {Modal} from '@daypilot/modal';
import { Calendar } from '../../../../models/calendar';
declare var $: any;

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit, AfterViewInit  {

  @ViewChild('calendar', {static: false}) calendar: DayPilotCalendarComponent;

  @ViewChild('modal', {static: false}) modal: DayPilotModalComponent;
  // tslint:disable-next-line:no-output-native
  @Output() close = new EventEmitter();
  form: FormGroup;
  dateFormat = 'MM/dd/yyyy h:mm tt';
  notes: Calendar[];
  item: Calendar = {
    start: '',
    end: '',
    text: '',
    user: ''
  };
  events: any[];
  navigatorConfig = {
    selectMode: 'week',
    showMonths: 3,
    skipMonths: 3
  };
  calendarConfig = {
    startDate: DayPilot.Date.today(),
    viewType: 'Week',
    cellHeight: 90,
    timeHeaderCellDuration: 60,
    cellDuration: 60,
    hourWidth: 0,
    eventDeleteHandling: 'Update',
    onEventDeleted: args => {
      this.ds.deleteEvent(args.e.id());
    },
    onTimeRangeSelected: args => {
      this.show(args);
      document.querySelector<HTMLElement>('.cal').style.pointerEvents = 'visible';
      document.querySelector<HTMLElement>('.cal').style.backgroundColor = 'blue';
      document.querySelector<HTMLElement>('.cal').style.color = 'white';
    }
  };


  constructor(private fb: FormBuilder, private ds: DataService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      start: ['', this.dateTimeValidator(this.dateFormat)],
      end: ['', [Validators.required, this.dateTimeValidator(this.dateFormat)]]
    });
  }
  // tslint:disable-next-line:typedef
  show1(args: any, txt: string, strt: string, endd: string) {
    args.name = '';
    this.form.setValue({
      start: args.start.toString(this.dateFormat),
      end: args.end.toString(this.dateFormat),
      name: ''
    });
  }
  // tslint:disable-next-line:typedef
  show(args: any) {
    args.name = '';
    this.form.setValue({
      start: args.start.toString(this.dateFormat),
      end: args.end.toString(this.dateFormat),
      name: ''
    });
    // Modal.alert('', this.show());
    // this.modal.show();
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
      this.ds.createEvent(this.item);
      this.item.text = '';
      this.item.start = '';
      this.item.end = '';
      this.item.user = '';
      document.querySelector<HTMLElement>('.modal').style.display = 'none';
      document.querySelector<HTMLElement>('.cal').style.pointerEvents = 'none';
      document.querySelector<HTMLElement>('.cal').style.backgroundColor = '#edf1f2';
      document.querySelector<HTMLElement>('.cal').style.color = 'black';
      this.calendar.control.clearSelection();
    }
  }

  // tslint:disable-next-line:typedef
  dateTimeValidator(format: string) {

    return (c: FormControl) => {
      const valid = !!DayPilot.Date.parse(c.value, format);
      return valid ? null : {badDateTimeFormat: true};
    };
  }

  ngOnInit(): void {
    $('#save').click(() => {
      $('#modalcalendar').modal('hide'); // modal_1 is the id 1
      });
  }

  ngAfterViewInit(): void {
  }
  // tslint:disable-next-line:typedef
  viewChange() {
    this.ds.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd()).subscribe(result => this.events = result);
  }
  navigatePrevious(event): void {
    event.preventDefault();
    this.calendarConfig.startDate = (this.calendarConfig.startDate as DayPilot.Date).addDays(-7);
  }

  navigateNext(event): void {
    event.preventDefault();
    this.calendarConfig.startDate = (this.calendarConfig.startDate as DayPilot.Date).addDays(7);
  }

  navigateToday(event): void {
    event.preventDefault();
    this.calendarConfig.startDate = DayPilot.Date.today();
  }

}
