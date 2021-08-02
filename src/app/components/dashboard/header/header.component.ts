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
  reportDate;
  constructor() { }

  public openPDF(): void {
  // tslint:disable-next-line:prefer-const
  let element = document.getElementById('htmlData');
  // tslint:disable-next-line:variable-name
  const HTML_Width = document.getElementById('htmlData').offsetWidth;
  // tslint:disable-next-line:variable-name
  const HTML_Height = document.getElementById('htmlData').offsetHeight;
  // tslint:disable-next-line:variable-name
  const top_left_margin = 15;
  // tslint:disable-next-line:variable-name
  const PDF_Width = HTML_Width + (top_left_margin * 2);
  // tslint:disable-next-line:variable-name
  const PDF_Height = (PDF_Width * 1.3) + (top_left_margin * 2);
  // tslint:disable-next-line:variable-name
  const canvas_image_width = HTML_Width;
  // tslint:disable-next-line:variable-name
  const canvas_image_height = HTML_Height;

  const totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
  html2canvas(element, {allowTaint: true}).then((canvas) => {
    canvas.getContext('2d');
    console.log(canvas.height + '  ' + canvas.width);

    // tslint:disable-next-line:prefer-const
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    // tslint:disable-next-line:prefer-const
    const pdf = new jspdf('p', 'pt',  [PDF_Width, PDF_Height]);
    pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);

    for (let i = 1; i <= totalPDFPages; i++) {
      pdf.addPage([PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
    }

    pdf.save('HTML-Document.pdf');
      });
  }
/*  public openPDF(): void {
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
  }*/

  ngOnInit(): void {
    this.hrReport();
    this.dateCalc();
    const d = new Date().toLocaleDateString();
    if (d > this.currDate){
      this.reportDate = ((this.currMonth + 1).toString()).concat('/', this.currYear.toString());
    }
    else{
      this.reportDate = (this.currMonth.toString()).concat('/', this.currYear.toString());
    }
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
