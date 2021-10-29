import { Component, AfterViewInit, OnInit } from '@angular/core';
declare var Tour;
@Component({
  selector: 'app-regulation',
  templateUrl: './regulation.component.html',
  styleUrls: ['./regulation.component.css']
})
export class RegulationComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  regInstructions(){
    // Instance the tour
const tourcalender = new Tour({
  debug: true,
  storage: false,
  backdrop: true,
  framework: 'bootstrap4',
    steps: [
    {
      element: '#regbox',
      title: 'Regulations',
      content: 'Here you can preview any work regulation, Hover or click on this box!'
    }
],
});
// Initialize the tour
// tour.init();
tourcalender.start();
localStorage.setItem('regInstruction', 'yes');
  }
  ngAfterViewInit(): void {
    if (localStorage.getItem('regInstruction') !== 'yes') {
      this.regInstructions();
    }
  }

}
