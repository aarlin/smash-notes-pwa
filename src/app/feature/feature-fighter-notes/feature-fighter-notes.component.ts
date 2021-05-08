import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FeatureCharacterSelectModalComponent } from '../feature-character-select-modal/feature-character-select-modal.component';
import { FeatureMatchupNoteComponent } from '../feature-matchup-note/feature-matchup-note.component';

interface Fighter {
  name?: string;
}

interface Note {
  id: number,
  groupName: string,
  player: string,
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
  fighterSeriesIcon: string;

  notes: Note[] = [
    {
      id: 1,
      groupName: "Stage Counterpick",
      player: 'homura,',
      enemy: "bayonetta",
      title: "Lylatt",
      body: "Choose lyatt for no ceiling"
    },
    {
      id: 2,
      groupName: "Stage Counterpick",
      player: 'homura,',
      enemy: "mario",
      title: "Lylatt",
      body: "Choose lyatt for no ceiling"
    },
    {
      id: 3,
      groupName: "Stage Counterpick",
      player: 'homura,',
      enemy: "bowser_jr",
      title: "Lylatt",
      body: "Choose lyatt for no ceiling"
    },
    {
      id: 4,
      groupName: "Stage Counterpick",
      player: 'homura,',
      enemy: "sephiroth",
      title: "Yoshi Island",
      body: "Choose lyatt for no ceiling"
    },
    {
      id: 5,
      groupName: "Kill Confirm",
      player: 'homura,',
      enemy: "donkey_kong",
      title: "60%",
      body: "Down air to up smash"
    },
    {
      id: 6,
      groupName: "Combo",
      player: 'homura,',
      enemy: "donkey_kong",
      title: "60%",
      body: "down throw to bair"
    },
    {
      id: 7,
      groupName: "Combo",
      player: 'homura,',
      enemy: "captain_falcon",
      title: "60%",
      body: "down throw to fair"
    },
    {
      id: 8,
      groupName: "Combo",
      player: 'homura,',
      enemy: "luigi",
      title: "60%",
      body: "down throw to fair"
    },
    {
      id: 9,
      groupName: "Combo",
      player: 'homura,',
      enemy: "snake",
      title: "60%",
      body: "down throw to fair"
    }
  ];

  chunkedData: ChunkedData = this.chunkByGroup(this.notes);

  homeIcon: string;

  constructor( public alertController: AlertController, public modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: FeatureCharacterSelectModalComponent,
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: 'character-select-modal'
    });
    return await modal.present();
  }

  ngOnInit() {
    this.homeIcon = 'assets/navigation/header_bar_ico.svg';
    this.fighterSeriesIcon = `assets/series-symbols/svg/xenoblade.svg`;

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

  close() {

  }

  async openNote(note: Note) {
    const modal = await this.modalController.create({
      component: FeatureMatchupNoteComponent,
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: 'character-select-modal',
      componentProps: { 
        note: note
      }
    });
    return await modal.present();
  }

}
