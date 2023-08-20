import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'keys' })

export class KeysPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: any) {
    return Object.keys(value);
  }
} 