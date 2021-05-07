import { Component, OnInit } from '@angular/core';

interface Fighter {
  name?: string;

}

@Component({
  selector: 'smash-feature-fighter-notes',
  templateUrl: './feature-fighter-notes.component.html',
  styleUrls: ['./feature-fighter-notes.component.scss'],
})
export class FeatureFighterNotesComponent implements OnInit {

  backgroundImage: string = '';
  background: string;
  fighterImage: string;

  constructor() { }

  ngOnInit() {
    let sampleFighter: Fighter = { name: 'homura' }
    this.setBackgroundImage(sampleFighter);
  }

  setBackgroundImage(fighter: Fighter) {
    this.backgroundImage = `url("https://www.smashbros.com/assets_v2/img/fighter/${fighter.name}/bg.jpg")`;
    this.background = `https://www.smashbros.com/assets_v2/img/fighter/${fighter.name}/bg.jpg`;
    this.fighterImage = `https://www.smashbros.com/assets_v2/img/fighter/${fighter.name}/main.png`;
  }

}
