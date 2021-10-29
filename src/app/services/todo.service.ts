import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  announceCollection: AngularFirestoreCollection<Todo>;
  announcelimitCollection: AngularFirestoreCollection<Todo>;
  announceDoc: AngularFirestoreDocument<Todo>;
  announces: Observable<Todo[]>;
  announceslimit: Observable<Todo[]>;

  constructor(public afs: AngularFirestore) {
    const email = localStorage.getItem('email');
    this.announceCollection = this.afs.collection('todolist', ref => ref.where('user' , '==', email.toString()).orderBy('date', 'desc'));
    this.announces = this.announceCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Todo;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    // limit announce
    // tslint:disable-next-line:max-line-length
    this.announcelimitCollection = this.afs.collection('todolist', ref => ref.where('user' , '==', email.toString()).where('isChecked' , '==', false).orderBy('date', 'desc').limit(3));
    this.announceslimit = this.announcelimitCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Todo;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }
  // tslint:disable-next-line:typedef
  getAnnounce(){
    return this.announces;
  }
  // tslint:disable-next-line:typedef
  getAnnounceLimit(){
    return this.announceslimit;
  }

  // tslint:disable-next-line:typedef
  addTitle(title: Todo){
    this.announceCollection.add(title);
  }
  // tslint:disable-next-line:typedef
  checkOrUnCheckTitle(announce: Todo){
    this.announceDoc = this.afs.doc(`todolist/${announce.id}`);
    this.announceDoc.update(announce);
  }
  // tslint:disable-next-line:typedef
  removeTitle(announce: Todo){
    this.announceDoc = this.afs.doc(`todolist/${announce.id}`);
    this.announceDoc.delete();
  }
}
