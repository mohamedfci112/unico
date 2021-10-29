import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Notes } from '../models/notes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notesCollection: AngularFirestoreCollection<Notes>;
  notesDoc: AngularFirestoreDocument<Notes>;
  notes: Observable<Notes[]>;

  constructor(public afs: AngularFirestore) {
    const email = localStorage.getItem('email');
    this.notesCollection = this.afs.collection('note', x => x.where('user' , '==', email.toString()).orderBy('date', 'desc'));
    this.notes = this.notesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Notes;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }
  // tslint:disable-next-line:typedef
  getNotes(){
    return this.notes;
  }
  // tslint:disable-next-line:typedef
  addNote(item: Notes){
    this.notesCollection.add(item);
  }
  // tslint:disable-next-line:typedef
  deleteItem(note: Notes){
    this.notesDoc = this.afs.doc(`note/${note.id}`);
    this.notesDoc.delete();
  }
  // tslint:disable-next-line:typedef
  updateNote(params: Notes) {
    // return this.http.post('../../../angular-calendar-php-backend/api/backend_move.php', params) as Observable<BackendResult>;
    this.notesDoc = this.afs.doc(`note/${params.id}`);
    this.notesDoc.update(params);
  }
}
