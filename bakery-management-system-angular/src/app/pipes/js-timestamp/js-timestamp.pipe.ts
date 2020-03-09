import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsTimestamp'
})
export class JsTimestampPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value * 1000;
  }

}
