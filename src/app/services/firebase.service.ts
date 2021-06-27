import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LogoutForm } from '../models/logoutForm';
import { UsersInfo } from '../models/usersInfo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  logoutFormCollection: AngularFirestoreCollection<LogoutForm>;
  infoUsersFormCollection: AngularFirestoreCollection<UsersInfo>;

  isLoggin = false;
  date1;
  date2;
  differencehr;
  differencemin;
  item: LogoutForm = {
    email: '',
    todayDate: '',
    minWork: '',
    hoursWork: '',
    workDesc: '',
    department: '',
    name: ''
  };
  usersinfo: Observable<UsersInfo[]>;
  logoutFormInfo: Observable<LogoutForm[]>;

constructor(public firebaseAuth: AngularFireAuth, public afs: AngularFirestore) {
    this.logoutFormCollection = this.afs.collection('logoutForm');
    this.infoUsersFormCollection = this.afs.collection('usersInfo');
  }

  // tslint:disable-next-line:typedef
async signin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res => {
      this.isLoggin = true;
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('email', email);
      if (!localStorage.getItem('loginDate')){
        this.date1 = new Date().toLocaleString();
        localStorage.setItem('loginDate', this.date1);
      }
    }, err => {
    if (err.code === 'auth/user-not-found'){
      alert('This account not found');
      this.isLoggin = false;
    }
    if (err.code === 'auth/invalid-email'){
      alert('This email invalid');
      this.isLoggin = false;
    }
    if (err.code === 'auth/wrong-password'){
      alert('Password is Wrong!');
      this.isLoggin = false;
    }
  });
  }

  // tslint:disable-next-line:typedef
async signup(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(res => {
      this.isLoggin = true;
      localStorage.setItem('user', JSON.stringify(res.user));
    });
  }

  // tslint:disable-next-line:typedef
logout(){
    this.firebaseAuth.signOut();
    this.isLoggin = false;
    localStorage.removeItem('user');
    localStorage.removeItem('depart');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }

  // tslint:disable-next-line:typedef
finalLogout(text: string){
    this.date2 = new Date().toLocaleString();
    this.date1 = localStorage.getItem('loginDate');
    this.timeDiffCalc(new Date(this.date1), new Date(this.date2));

    this.item.email = localStorage.getItem('email');
    this.item.todayDate = new Date().toLocaleDateString();
    this.item.minWork = this.differencemin;
    this.item.hoursWork = this.differencehr;
    this.item.workDesc = text;
    this.item.department = localStorage.getItem('depart');
    this.item.name = localStorage.getItem('name');
    this.logoutFormCollection.add(this.item);
    this.firebaseAuth.signOut();
    this.isLoggin = false;
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    localStorage.removeItem('loginDate');
    localStorage.removeItem('depart');
    localStorage.removeItem('name');
    this.item.email = '';
    this.item.todayDate = '';
    this.item.minWork = '';
    this.item.hoursWork = '';
    this.item.workDesc = '';
    this.item.department = '';
  }


// tslint:disable-next-line:typedef
timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    this.differencehr = hours;
    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    this.differencemin = minutes;

  }

  // tslint:disable-next-line:typedef
  userInfo(){
    const email = localStorage.getItem('email');
    this.usersinfo = this.afs.collection('usersInfo', x => x.where('email' , '==', email.toString())).snapshotChanges().pipe(
      map(
        changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as UsersInfo;
            data.id = a.payload.doc.id;
            return data;
          });
        }
      )
    );
    return this.usersinfo;
  }

  // tslint:disable-next-line:typedef
  getLogoutForm(){
    this.logoutFormInfo = this.logoutFormCollection.snapshotChanges().pipe(
      map(
        changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as LogoutForm;
            data.id = a.payload.doc.id;
            return data;
          });
        }
      )
    );
    // console.log(this.logoutFormCollection.doc('Mohamed Bauomy').collection('hoursWork').get());
    // return this.logoutFormCollection.doc('Mohamed Bauomy').collection('hoursWork').get();
    return this.logoutFormInfo;
  }

}
