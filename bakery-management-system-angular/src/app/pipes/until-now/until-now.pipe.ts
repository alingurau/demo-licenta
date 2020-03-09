import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'untilNow'
})
export class UntilNowPipe implements PipeTransform {

  transform(value: any): any {
    const now = new Date();
    const date = new Date(value);

    if (date < now) {
      return 'Expired';
    } else {
      return moment(date).toNow(true);
    }
  }

}
