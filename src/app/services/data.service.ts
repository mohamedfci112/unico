import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DayPilot} from 'daypilot-pro-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import EventData = DayPilot.EventData;
import { Calendar } from '../models/calendar';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  calendarCollection: AngularFirestoreCollection<Calendar>;
  gtCalendarDoc: AngularFirestoreDocument<Calendar>;
  notes: Observable<Calendar[]>;

  usersinfo: Observable<EventData[]>;
  calendarDoc: AngularFirestoreDocument<Calendar>;
  constructor(private http: HttpClient, public afs: AngularFirestore) {
    this.calendarCollection = this.afs.collection('calendar');
  }

  // tslint:disable-next-line:typedef
  getEvents(start: DayPilot.Date, end: DayPilot.Date) {
     const email = localStorage.getItem('email');
     // tslint:disable-next-line:max-line-length
     this.usersinfo = this.afs.collection('calendar', x => x.where('user' , '==', email.toString())).snapshotChanges().pipe(
      map(
        changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as EventData;
            data.id = a.payload.doc.id;
            return data;
          });
        }
      )
    );
     return this.usersinfo;
  }
  // tslint:disable-next-line:typedef
  createEvent(item: Calendar) {
    this.calendarCollection.add(item);
  }

  // tslint:disable-next-line:typedef
  deleteEvent(id: string){
    this.gtCalendarDoc = this.afs.doc(`calendar/${id}`);
    this.gtCalendarDoc.delete();
  }

  // tslint:disable-next-line:typedef
  moveEvent(params: Calendar) {
    // return this.http.post('../../../angular-calendar-php-backend/api/backend_move.php', params) as Observable<BackendResult>;
    this.calendarDoc = this.afs.doc(`calendar/${params.id}`);
    this.calendarDoc.update(params);
  }
}
export interface CreateEventParams {
  id?: string | number;
  start: string;
  end: string;
  text: string;
}

export interface MoveEventParams {
  id?: string | number;
  start?: string;
  end?: string;
  text: string;
}

export interface BackendResult {
  id: string | number;
  result: string;
  message: string;
}
