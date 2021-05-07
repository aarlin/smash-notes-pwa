import { Component, OnInit } from '@angular/core';

interface Fighter {
  name?: string;
}

interface Note {
  groupName: string,
  enemy: string,
  title: string,
  body: string,
  enemyImage?: string
}

interface ChunkedData {
  [key: string]: Note[];
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

  notes: Note[] = [
    {
      groupName: "Stage Counterpick",
      enemy: "bayonetta",
      title: "Lylatt",
      body: "Choose lyatt for no ceiling"
    },
    {
      groupName: "Stage Counterpick",
      enemy: "sephiroth",
      title: "Yoshi Island",
      body: "Choose lyatt for no ceiling"
    },
    {
      groupName: "Kill Confirm",
      enemy: "donkey_kong",
      title: "60%",
      body: "Down air to up smash"
    },
    {
      groupName: "Combo",
      enemy: "donkey_kong",
      title: "60%",
      body: "down throw to bair"
    },
    {
      groupName: "Combo",
      enemy: "captain_falcon",
      title: "60%",
      body: "down throw to fair"
    }
  ];

  chunkedData: ChunkedData = this.chunkByGroup(this.notes);

  constructor() { }

  ngOnInit() {
    let sampleFighter: Fighter = { name: 'homura' }
    this.setBackgroundImage(sampleFighter);
    let chunkedData = this.chunkByGroup(this.notes);
    console.log(chunkedData);
  }

  chunkByGroup(notes: Note[]) {
    let groups = {};
    for (let note of notes) {
      console.log(note, groups[note.groupName])
      if (groups[note.groupName] === undefined) {
        groups[note.groupName] = []
      } 
      note.enemyImage = `https://www.smashbros.com/assets_v2/img/fighter/thumb_a/${note.enemy}.png`
      groups[note.groupName].push(note);
    }
    return groups;
  }

  setBackgroundImage(fighter: Fighter) {
    this.backgroundImage = `url("https://www.smashbros.com/assets_v2/img/fighter/${fighter.name}/bg.jpg")`;
    this.background = `https://www.smashbros.com/assets_v2/img/fighter/${fighter.name}/bg.jpg`;
    this.fighterImage = `https://www.smashbros.com/assets_v2/img/fighter/${fighter.name}/main.png`;
  }

}
