import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fighterImage',
  pure: true
})
export class FighterImagePipe implements PipeTransform {
  dlcFighters = ['homura', 'sephiroth', 'steve', 'minmin', 'byleth', 'terry', 'banjo_and_kazooie', 'dq_hero', 'kazuya']

  transform(value: string, ...args: unknown[]): unknown {
    console.count('fighterimage')
    if (this.dlcFighters.includes(value)) {
      return `assets/stock-icons/webp/${value}.webp`
    }
    if (!value) {
      return 'assets/navigation/ico_fighter_g.svg';
    }
    return `assets/stock-icons/svg/${value}.svg`;
  }



}
