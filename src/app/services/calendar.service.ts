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
  calendarlimitCollection: AngularFirestoreCollection<Calendar>;
  calendarlimit: Observable<Calendar[]>;
  //
  todolimitCollection: AngularFirestoreCollection<Task>;
  todolimit: Observable<Task[]>;

  constructor(public afs: AngularFirestore) {
    // limit calendar events
    this.calendarlimitCollection = this.afs.collection('calendar', ref => ref.where('user' , '==', localStorage.getItem('email')).limit(3));
    this.calendarlimit = this.calendarlimitCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Calendar;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    // limit todo list
    this.todolimitCollection = this.afs.collection('todo', ref => ref.where('user' , '==', localStorage.getItem('email')).limit(3));
    this.todolimit = this.todolimitCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Task;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }
  // tslint:disable-next-line:typedef
  getCalendarlimit(){
    return this.calendarlimit;
  }
  // tslint:disable-next-line:typedef
  getTodolimit(){
    return this.todolimit;
  }
}
