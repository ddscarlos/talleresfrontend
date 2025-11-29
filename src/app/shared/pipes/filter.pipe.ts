import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: any, filterKey: string = ''): any[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => {
      if (filterKey) {
        return item[filterKey] === filter;
      }
      return item === filter;
    });
  }
}
