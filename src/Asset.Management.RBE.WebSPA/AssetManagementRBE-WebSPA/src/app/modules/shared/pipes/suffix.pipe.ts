import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'suffix'})
export class SuffixPipe implements PipeTransform {
  transform(value: any, suffix: string): string {
    return `${value} ${suffix}`;
  }
}
@Pipe({name: 'prefix'})
export class PrefixPipe implements PipeTransform {
  transform(value: any, prefix: string): string {
    return `${prefix} ${value}`;
  }
}
