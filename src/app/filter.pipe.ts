import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      const rVal = (val.start.toLocaleLowerCase().includes(args)) || (val.text.toLocaleLowerCase().includes(args));
      return rVal;
    });

  }

}
