import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Calendar } from '../models/calendar';
import { Task } from '../components/dashboard/space/task/task';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendarCollection: AngularFirestoreCollection<Calendar>;
  calendarlimitCollection: AngularFirestoreCollection<Calendar>;
  calendarNotifyCollection: AngularFirestoreCollection<Calendar>;
  calendarDoc: AngularFirestoreDocument<Calendar>;
  calendar: Observable<Calendar[]>;
  calendarlimit: Observable<Calendar[]>;
  calendarNotify: Observable<Calendar[]>;
  //
  todolimitCollection: AngularFirestoreCollection<Task>;
  todolimit: Observable<Task[]>;

  constructor(public afs: AngularFirestore) {
    //
    // tslint:disable-next-line:max-line-length
    this.calendarCollection = this.afs.collection('calendar', ref => ref.where('user' , '==', localStorage.getItem('email')));
    this.calendar = this.calendarCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Calendar;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    // tslint:disable-next-line:max-line-length
    this.calendarlimitCollection = this.afs.collection('calendar', ref => ref.where('user' , '==', localStorage.getItem('email')).orderBy('start', 'desc').limit(3));
    this.calendarlimit = this.calendarlimitCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Calendar;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    // limit todo list
    // tslint:disable-next-line:max-line-length
    this.todolimitCollection = this.afs.collection('todo', ref => ref.where('user' , '==', localStorage.getItem('email')).limit(3));
    this.todolimit = this.todolimitCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Task;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    // calendar notifications
    const date = new Date().toLocaleDateString();
    // tslint:disable-next-line:max-line-length
    this.calendarNotifyCollection = this.afs.collection('calendar', ref => ref.where('user' , '==', localStorage.getItem('email')));
    this.calendarNotify = this.calendarNotifyCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Calendar;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }
  // tslint:disable-next-line:typedef
  validDateFormat(dateString) {
    if (dateString) {
      const date = new Intl.DateTimeFormat('en', dateString);
      return date;
    }

    return null;
  }

  // tslint:disable-next-line:typedef
  getCalendarNotify(){
    return this.calendarNotify;
  }

  // tslint:disable-next-line:typedef
  getCalendar(){
    return this.calendar;
  }
  // tslint:disable-next-line:typedef
  getCalendarlimit(){
    return this.calendarlimit;
  }
  // tslint:disable-next-line:typedef
  getTodolimit(){
    return this.todolimit;
  }
  // tslint:disable-next-line:typedef
  deleteCalNotifyItem(calendar: Calendar){
    this.calendarDoc = this.afs.doc(`calendar/${calendar.id}`);
    this.calendarDoc.delete();
  }
}
