import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

  transform(value: any, limit: number, text: string): any {
    if (value.length > limit) {
      if (text) {
        value = value.substring(0, limit - text.length) + text;
      } else {
        value = value.substring(0, limit - 100);
      }
    }

    return value;
  }

}
