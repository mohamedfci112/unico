import { Component, OnInit } from '@angular/core';
import { FireSQL } from 'firesql';
import firebase from 'firebase/app';
import 'firebase/firestore';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-manager-report',
  templateUrl: './manager-report.component.html',
  styleUrls: ['./manager-report.component.css']
})
export class ManagerReportComponent implements OnInit {

  fireSQL = new FireSQL(firebase.firestore());
  allUsers;
  uname: any[] = [];
  uname1: any[] = [];
  department: any[] = [];
  department1: any[] = [];
  workdescrip: any[] = [];
  preweek;
  currweek;
  managerReport;
  hours: any[] = [];
  min: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.getAll();
  }

  // tslint:disable-next-line:typedef
  getInfoDetails(xname: string){
    this.prevweek();
    this.currentweek();
    this.managerReport = this.fireSQL.query(`
    SELECT name, department, SUM(hoursWork) as h, SUM(minWork) as m
    FROM logoutForm
    WHERE name = '` + xname + `' AND todayDate > '` + this.preweek + `' AND todayDate < '` + this.currweek + `'
    GROUP BY name`
    );
    this.managerReport.then(cities => {
    for (const city of cities) {
      this.uname1.push(`${city.name}`);
      this.department1.push(`${city.department}`);
      const num = `${city.m}`;
      // tslint:disable-next-line:radix
      const hrs = (parseInt(num) / 60);
      const nhrs = Math.floor(hrs);
      const mins = (hrs - nhrs) * 60;
      const nmins = Math.round(mins);
      // tslint:disable-next-line:radix
      const finalhours = (parseInt(`${city.h}`) + nhrs);
        // tslint:disable-next-line:align
        this.hours.push(finalhours);
        // tslint:disable-next-line:align
        this.min.push(nmins);
    }
  });
  }
  // tslint:disable-next-line:typedef
  getInfoDesc(xname: string){
    this.prevweek();
    this.currentweek();
    this.managerReport = this.fireSQL.query(`
    SELECT workDesc
    FROM logoutForm
    WHERE name = '` + xname + `' AND todayDate > '` + this.preweek + `' AND todayDate < '` + this.currweek + `'`
    );
    this.managerReport.then(cities => {
    for (const city of cities) {
      this.workdescrip.push(`${city.workDesc}`);
    }
  });
  }
  // tslint:disable-next-line:typedef
  userPdf(xuname: string){
    this.uname1 = [];
    this.department1 = [];
    this.workdescrip = [];
    this.hours = [];
    this.min = [];
    this.getInfoDetails(xuname);
    this.getInfoDesc(xuname);
  }
  // tslint:disable-next-line:typedef
  prevweek(){
    const today = new Date();
    this.preweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toLocaleDateString();
  }
  // tslint:disable-next-line:typedef
  currentweek(){
    const today = new Date();
    this.currweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toLocaleDateString();
  }

  // tslint:disable-next-line:typedef
  getAll(){
    const type = localStorage.getItem('type');
    const depart = localStorage.getItem('depart');
    this.allUsers = this.fireSQL.query(`
    SELECT name, department
    FROM usersInfo
    ORDER BY department
  `);
    this.allUsers.then(cities => {
    for (const city of cities) {
      if (type === 'manager' && `${city.department}` !== ''){
        this.uname.push(`${city.name}`);
        this.department.push(`${city.department}`);
      }
      else if (type === 'dmanager' && `${city.department}` === depart.toString()){
        this.uname.push(`${city.name}`);
        this.department.push(`${city.department}`);
      }
    }
  });
  }

}
