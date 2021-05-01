import { Component, OnInit } from '@angular/core';

interface Character {
  name: string;
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
  selector: 'app-feature-toolbar',
  templateUrl: './feature-toolbar.component.html',
  styleUrls: ['./feature-toolbar.component.scss'],
})
export class FeatureToolbarComponent implements OnInit {

  colorTheme = ["", "secondary", "dark"]

  selectedPlayerImage = 'assets/portraits/thumbnail_horizontal/ico_dlc_cs.svg';
  selectedEnemyImage = 'assets/portraits/thumbnail_horizontal/ico_dlc_cs.svg';

  portraitSize: PortraitSize = PortraitSize.SMALL;
  portraitImageExtension: PortraitImageExtension = PortraitImageExtension.WEBP;

  constructor() { }

  ngOnInit() {
    this.selectedPlayerImage = `assets/portraits/${this.portraitSize}/homura.${this.portraitImageExtension}`;
    this.selectedEnemyImage = `assets/portraits/${this.portraitSize}/homura.${this.portraitImageExtension}`;
  }

}
