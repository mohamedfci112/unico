import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.css']
})
export class ManualComponent implements OnInit {

  src = '';
  // https://unico-egypt.com/upload/internal_work_reg.pdf
// ../../../../assets/img/dashboard/internal_work_reg.pdf
  constructor() { }

  ngOnInit(): void {
  }

}
