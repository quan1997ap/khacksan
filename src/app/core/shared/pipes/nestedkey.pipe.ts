import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'nestedKey' })

export class NestedKeyPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: any, keyString: string, defaultValue: any = '') {
    // keyString : "a.b"
    let keys = keyString.split('.');
    if(keys.length == 1){
        return value[keyString];
    } else {
        let returnValue : any = value;
        keys.forEach( key => {
            returnValue =  returnValue[key] != null ? returnValue[key] : defaultValue ;
        })
        return returnValue;
    }
  }
} 