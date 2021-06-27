import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  constructor() { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  prevSlide() {
    this.carousel.prev();
  }

  // tslint:disable-next-line:typedef
  nextSlide() {
    this.carousel.next();
  }

  // tslint:disable-next-line:typedef
  stopSlider() {
    this.carousel.pause();
  }

}
