import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'htmlr'
})
export class HtmlrPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) { }

  // tslint:disable-next-line:typedef
  transform(value) {
    value = value.substring(13, value.length - 1);
     // tslint:disable-next-line:align
     const doc = new DOMParser().parseFromString(value, 'text/html');
    const value123 = doc.documentElement.textContent;
    return this.sanitized.bypassSecurityTrustHtml(value123);
  }

}
