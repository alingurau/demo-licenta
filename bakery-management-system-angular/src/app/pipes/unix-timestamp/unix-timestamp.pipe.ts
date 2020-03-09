import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixTimestamp'
})
export class UnixTimestampPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Math.round(value / 1000);
  }

}
