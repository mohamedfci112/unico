import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Announce } from '../models/announce';
import { AnnounceNotificationUser } from '../models/anouncNotify';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  announceCollection: AngularFirestoreCollection<Announce>;
  announcelimitCollection: AngularFirestoreCollection<Announce>;
  announceDetCollection: AngularFirestoreCollection<Announce>;
  announceNotification: AngularFirestoreCollection<AnnounceNotificationUser>;
  announceDoc: AngularFirestoreDocument<Announce>;
  announceNotifyDoc: AngularFirestoreDocument<AnnounceNotificationUser>;
  announces: Observable<Announce[]>;
  announcesNotify: Observable<AnnounceNotificationUser[]>;
  announceslimit: Observable<Announce[]>;
  announcesDet: Observable<Announce[]>;

  constructor(public afs: AngularFirestore) {
    this.announceCollection = this.afs.collection('announc', ref => ref.orderBy('date', 'desc'));
    this.announces = this.announceCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Announce;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    // limit announce
    this.announcelimitCollection = this.afs.collection('announc', ref => ref.orderBy('date', 'desc').limit(3));
    this.announceslimit = this.announcelimitCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Announce;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.announceNotification = this.afs.collection('announcnotify', ref => ref.where('user', '==', localStorage.getItem('email')));
    this.announcesNotify = this.announceNotification.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as AnnounceNotificationUser;
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
  getAnnounceDet(id: string){
    // announce details
    this.announceDetCollection = this.afs.collection('announc', ref => ref.where('date', '==', id));
    this.announcesDet = this.announceDetCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Announce;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.announcesDet;
  }
  // tslint:disable-next-line:typedef
  addAnnounce(item: Announce){
    this.announceCollection.add(item);
  }
  // tslint:disable-next-line:typedef
  getAnnounceNotification(){
    return this.announcesNotify;
  }
  // tslint:disable-next-line:typedef
  addNotifyAnnounceForUser(item: AnnounceNotificationUser){
    this.announceNotification.add(item);
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
  // tslint:disable-next-line:typedef
  deleteAnnoNotifyItem(item: AnnounceNotificationUser){
    this.announceNotifyDoc = this.afs.doc(`announcnotify/${item.id}`);
    this.announceNotifyDoc.delete();
  }
}
