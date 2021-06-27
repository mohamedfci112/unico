import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Announce } from '../models/announce';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  announceCollection: AngularFirestoreCollection<Announce>;
  announcelimitCollection: AngularFirestoreCollection<Announce>;
  announceDoc: AngularFirestoreDocument<Announce>;
  announces: Observable<Announce[]>;
  announceslimit: Observable<Announce[]>;

  constructor(public afs: AngularFirestore) {
    this.announceCollection = this.afs.collection('announc', ref => ref.orderBy('title', 'desc'));
    this.announces = this.announceCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Announce;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    // limit announce
    this.announcelimitCollection = this.afs.collection('announc', ref => ref.orderBy('title', 'desc').limit(3));
    this.announceslimit = this.announcelimitCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Announce;
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
  getAnnouncelimit(){
    return this.announceslimit;
  }
  // tslint:disable-next-line:typedef
  addAnnounce(item: Announce){
    this.announceCollection.add(item);
  }

  // tslint:disable-next-line:typedef
  updateItem(announce: Announce){
    this.announceDoc = this.afs.doc(`announc/${announce.id}`);
    this.announceDoc.update(announce);
  }

  // tslint:disable-next-line:typedef
  deleteItem(announce: Announce){
    this.announceDoc = this.afs.doc(`announc/${announce.id}`);
    this.announceDoc.delete();
  }
}
