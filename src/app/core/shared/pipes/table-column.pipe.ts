// https://remotestack.io/angular-custom-filter-search-pipe-example-tutorial/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableColumn'
})

export class TableColumnPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      if(!value)return null;
      if(!args)return value;

      args = args.toLowerCase();

      return value.map( (column: any) => column.key);
  }

}