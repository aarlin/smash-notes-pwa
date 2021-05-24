import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalizeName'
})
export class NormalizeNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value?.split('_').map(word => this.capitalize(word)).join(' ');
  }

  private capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

}
