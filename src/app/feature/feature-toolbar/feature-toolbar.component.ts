import { Component, Input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

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

  @Input() headerTitle: string;

  colorTheme = ["", "secondary", "dark"];

  homeIcon: string;


  portraitSize: PortraitSize = PortraitSize.THUMBNAIL_HORIZONTAL;
  portraitImageExtension: PortraitImageExtension = PortraitImageExtension.WEBP;

  constructor(private title: Title, private meta: Meta, private router: Router) { }

  ngOnInit() {
    this.addMetaTags();
    this.homeIcon = 'assets/navigation/header_bar_ico.svg';

  }

  addMetaTags() {
    this.title.setTitle(this.headerTitle);
    this.meta.addTags([
      { name: 'twitter:card', content: this.headerTitle },
      { name: 'og:url', content: this.router.url },
      { name: 'og:title', content: this.headerTitle },
      { name: 'og:description', content: this.headerTitle },
      { name: 'og:image', content: 'assets/navigation/header_bar_ico.svg' }
    ]);
  }


  goHome() {
    console.log('home')
    this.router.navigateByUrl('login');
  }

  searchOpen() {

  }

  presentModal() {

  }


}
