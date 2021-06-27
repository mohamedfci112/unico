import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { UsersInfo } from '../../../models/usersInfo';
import { LogoutForm } from '../../../models/logoutForm';
import { FireSQL } from 'firesql';
import firebase from 'firebase/app';
import 'firebase/firestore';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // tslint:disable-next-line:typedef-whitespace
  // @ViewChild('htmlData') htmlData: ElementRef;
  // tslint:disable-next-line:member-ordering
  fireSQL = new FireSQL(firebase.firestore());
  // tslint:disable-next-line:member-ordering
  citiesPromise;
  // tslint:disable-next-line:member-ordering
  uname: any[] = [];
  // tslint:disable-next-line:member-ordering
  department: any[] = [];
  // tslint:disable-next-line:member-ordering
  hours: any[] = [];
  // tslint:disable-next-line:member-ordering
  min: any[] = [];
  fullCurrDate;
  Day;
  currMonth;
  prevMonth;
  currYear;
  prevYear;
  currDate;
  prevDate;
  constructor() { }

  public openPDF(): void {
    // tslint:disable-next-line:prefer-const
    let element = document.getElementById('htmlData');
    html2canvas(element).then((canvas) => {
      // tslint:disable-next-line:prefer-const
      let imgData = canvas.toDataURL('image/png');
      // tslint:disable-next-line:prefer-const
      let doc = new jspdf();
      // tslint:disable-next-line:prefer-const
      let imgHeight = canvas.height * 208 / canvas.width;
      doc.addImage(imgData, 0, 0, 208, imgHeight);
      doc.save('doc.pdf');
    });
  }

  ngOnInit(): void {
    this.hrReport();
    // this.dateCalc();
  }

  // tslint:disable-next-line:typedef
  dateCalc(){
    this.fullCurrDate = new Date();
    this.Day = '20';
    this.currMonth = this.fullCurrDate.getMonth() + 1;
    this.prevMonth = this.fullCurrDate.getMonth();
    this.currYear = this.fullCurrDate.getFullYear();
    this.prevYear = this.fullCurrDate.getFullYear();
    // tslint:disable-next-line:triple-equals
    if (this.prevMonth.toString() == '0'){// 0
      this.prevMonth = '12';
    }
    // tslint:disable-next-line:triple-equals
    if (this.prevMonth.toString() == '12'){
      this.prevYear = this.prevYear - 1;
    }
    this.currDate = (this.currMonth.toString()).concat('/', this.Day.toString(), '/', this.currYear.toString());
    this.prevDate = (this.prevMonth.toString()).concat('/', this.Day.toString(), '/', this.prevYear.toString());
    console.log(this.currDate);
    console.log(this.prevDate);
  }
    // tslint:disable-next-line:typedef
    hrReport(){
      this.dateCalc();
      this.citiesPromise = this.fireSQL.query(`
      SELECT name, department, workDesc, SUM(hoursWork) as h, SUM(minWork) as m
      FROM logoutForm
      WHERE todayDate > '` + this.prevDate + `' AND todayDate < '` + this.currDate + `'
      GROUP BY name
    `);
      this.citiesPromise.then(cities => {
      for (const city of cities) {
        this.uname.push(`${city.name}`);
        this.department.push(`${city.department}`);
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

}
