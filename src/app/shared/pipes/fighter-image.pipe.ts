import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fighterImage'
})
export class FighterImagePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const dlcFighters = ['homura', 'sephiroth', 'steve', 'minmin', 'byleth', 'terry', 'banjo_and_kazooie', 'dq_hero']
    if (dlcFighters.includes(value)) {
      return `assets/stock-icons/webp/${value}.webp`
    }
    return `assets/stock-icons/svg/${value}.svg`;
  }



}
