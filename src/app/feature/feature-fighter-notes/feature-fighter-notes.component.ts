import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { NoteService } from 'src/app/services/note.service';
import { FeatureCharacterSelectModalComponent } from '../feature-character-select-modal/feature-character-select-modal.component';
import { FeatureMatchupNoteComponent } from '../feature-matchup-note/feature-matchup-note.component';
import { Note } from '../../shared/interface/note';

interface Fighter {
  name?: string;
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

  dataLoaded: boolean;

  notes: Note[] = [];

  chunkedData: ChunkedData;

  homeIcon: string;

  constructor(public alertController: AlertController, public modalController: ModalController, private noteService: NoteService) { }

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

    // this.noteService.load()
    //   .subscribe((notes: Note[]) => {
    //     this.chunkedData = this.chunkByGroup(notes);
    //     this.notes = notes;
    //     console.log(notes);
    //     console.log(this.chunkedData);
    //   }, err => {
    //     console.log('error')
    //   }, () => {
    //     this.dataLoaded = !this.dataLoaded;
    //   })

    this.noteService.getNotesByFighter(sampleFighter.name)
    .then((snapshot) => {
      const data = snapshot.docs.map(doc => {
        return {
          // id: doc.id,
          ...doc.data() as Note
        };
      });
      console.log("All data in 'notes' collection for fighter: ", sampleFighter.name, data); 
      this.notes = data;
      this.dataLoaded = !this.dataLoaded;
    }, error => {
      console.log(error);
      this.dataLoaded = !this.dataLoaded;
    });
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
