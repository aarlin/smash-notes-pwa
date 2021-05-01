import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { FightersService } from 'src/app/services/fighters.service';


interface Fighter {
  name: string;
  appearsIn: string[]
}

enum PortraitSize {
  FULL = 'full',
  SMALL = 'small_horizontal',
  THUMBNAIL_HORIZONTAL = 'thumbnail_horizontal',
}

enum PortraitImageExtension {
  WEBP = 'webp',
  PNG = 'png',
}


@Component({
  selector: 'smash-feature-character-select',
  templateUrl: './feature-character-select.component.html',
  styleUrls: ['./feature-character-select.component.scss'],
})
export class FeatureCharacterSelectComponent implements OnInit {

  fighter: Fighter
  fighters: Fighter[];

  player: Fighter;
  enemy: Fighter;

  compareWith(o1: Fighter, o2: Fighter) {
    return o1 && o2 ? o1.name === o2.name : o1 === o2;
  }

  pageToLoadNext: 1;
  pageSize = 100;
  isSingleView = false;

  portraitSize: PortraitSize = PortraitSize.SMALL;
  portraitImageExtension: PortraitImageExtension = PortraitImageExtension.WEBP;

  constructor(private fightersService: FightersService) { }

  ngOnInit(): void {
    this.fightersService.load(this.pageToLoadNext, this.pageSize)
    .subscribe((fighters: Fighter[]) => {
      this.fighters = fighters;
      console.log(this.fighters);
    });
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

}
