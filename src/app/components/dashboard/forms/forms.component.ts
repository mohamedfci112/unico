import { Component, AfterViewInit, OnInit } from '@angular/core';
declare var Tour;
declare var printJS;

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  printPdf(url: string){
    if (window.location.href === 'https://www.unico-egypt.com/forms') {
      printJS({printable: 'https://www.unico-egypt.com/assets/forms/' + url, type:  'pdf', showModal: true});
    }
    else if (window.location.href === 'https://unico-egypt.com/forms'){
      printJS({printable: 'https://unico-egypt.com/assets/forms/' + url, type:  'pdf', showModal: true});
    }
    else if (window.location.href === 'http://localhost:4200/forms'){
      printJS({printable: 'http://localhost:4200/assets/forms/' + url, type:  'pdf', showModal: true});
    }
  }
// tslint:disable-next-line:typedef
  formInstructions(){
    // Instance the tour
const tourcalender = new Tour({
  debug: true,
  storage: false,
  backdrop: true,
  framework: 'bootstrap4',
    steps: [
    {
      element: '#formbox',
      title: 'Form Operations',
      content: 'Here you can preview or print any form, Hover or click on this box!'
    }
],
});
// Initialize the tour
// tour.init();
tourcalender.start();
localStorage.setItem('formInstruction', 'yes');
  }
  ngAfterViewInit(): void {
    if (localStorage.getItem('formInstruction') !== 'yes') {
      this.formInstructions();
    }
  }
}
