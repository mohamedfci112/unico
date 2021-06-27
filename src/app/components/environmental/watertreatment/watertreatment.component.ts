import { Component, OnInit } from '@angular/core';

// tslint:disable-next-line:typedef
/*
function movetext(){
  const glowInTexts = document.querySelectorAll('.glowIn');
  glowInTexts.forEach(glowInText => {
          const letters = glowInText.textContent.split('');
          glowInText.textContent = '';
          letters.forEach((letter, i) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.animationDelay = `${i * 0.02}s`;
            glowInText.append(span);
          });
        });
}*/
@Component({
  selector: 'app-watertreatment',
  templateUrl: './watertreatment.component.html',
  styleUrls: ['./watertreatment.component.css']
})
export class WatertreatmentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
