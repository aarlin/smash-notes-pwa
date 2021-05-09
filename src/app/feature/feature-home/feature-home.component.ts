import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoteService } from 'src/app/services/note.service';
import { FeatureMatchupNoteComponent } from '../feature-matchup-note/feature-matchup-note.component';

interface Note {
  id: number,
  groupName: string,
  player: string,
  enemy: string,
  title: string,
  body: string,
  enemyImage?: string
  playerImage?: string
}

@Component({
  selector: 'smash-feature-home',
  templateUrl: './feature-home.component.html',
  styleUrls: ['./feature-home.component.scss'],
})
export class FeatureHomeComponent implements OnInit {

  dataLoaded: boolean;
  notes: Note[];

  constructor(private noteService: NoteService, public modalController: ModalController) { }

  ngOnInit() {
    this.noteService.load()
      .subscribe((notes: Note[]) => {
        this.notes = notes.map(note => {
          note.enemyImage = `https://www.smashbros.com/assets_v2/img/fighter/thumb_a/${note.enemy}.png`;
          note.playerImage = `https://www.smashbros.com/assets_v2/img/fighter/thumb_a/${note.player}.png`;
          return note;
        })
      }, err => {
        console.log('error in home')
      }, () => {
        this.dataLoaded = !this.dataLoaded;
      });
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
