import { Component, Input, OnInit } from '@angular/core';

interface Character {
  name: string;
}

enum PortraitSize {
  FULL = 'full',
  SMALL = 'small_horizontal',
  THUMBNAIL_HORIZONTAL = 'thumb_h',
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

  @Input() title: string;

  colorTheme = ["", "secondary", "dark"];
  
  homeIcon: string;

  selectedPlayerImage = 'assets/portraits/thumbnail_horizontal/ico_dlc_cs.svg';
  selectedEnemyImage = 'assets/portraits/thumbnail_horizontal/ico_dlc_cs.svg';

  portraitSize: PortraitSize = PortraitSize.THUMBNAIL_HORIZONTAL;
  portraitImageExtension: PortraitImageExtension = PortraitImageExtension.WEBP;

  constructor() { }

  ngOnInit() {
    this.selectedPlayerImage = `assets/portraits/${this.portraitSize}/homura.${this.portraitImageExtension}`;
    this.selectedEnemyImage = `assets/portraits/${this.portraitSize}/homura.${this.portraitImageExtension}`;
    this.homeIcon = 'assets/navigation/header_bar_ico.svg';

  }


  close() {

  }

  searchOpen() {

  }

  presentModal() {

  }


}
