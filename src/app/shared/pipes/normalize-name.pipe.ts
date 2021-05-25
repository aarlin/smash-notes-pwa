import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalizeName'
})
export class NormalizeNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value ? 
      this.internationalize(value).split('_').map(word => this.capitalize(word)).join(' ') : '';
  }

  private capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  private internationalize = (s) => {
    console.log(s);
    const englishNames = {
      'homura': 'Pyra / Mythra',
      'packun_flower': 'piranha_plant',
      'dq_hero': 'hero'
    }
    const internationlizedNames = ['homura', 'packun_flower', 'dq_hero']
    if (internationlizedNames.includes(s)) {
      return englishNames[s];
    }
    return s;

  }

}
