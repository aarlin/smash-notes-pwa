import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoteService } from 'src/app/services/note.service';
import { FeatureMatchupNoteComponent } from '../feature-matchup-note/feature-matchup-note.component';
import { Note } from '../../shared/interface/note.interface';

@Component({
  selector: 'smash-feature-home',
  templateUrl: './feature-home.component.html',
  styleUrls: ['./feature-home.component.scss'],
})
export class FeatureHomeComponent implements OnInit {

  dataLoaded: boolean;
  notes: Note[] = [];

  constructor(private noteService: NoteService, public modalController: ModalController) { }

  ngOnInit() {
    // this.noteService.load()
    //   .subscribe((notes: Note[]) => {
    //     this.notes = notes.map(note => {
    //       note.enemyImage = `https://www.smashbros.com/assets_v2/img/fighter/thumb_a/${note.enemy}.png`;
    //       note.playerImage = `https://www.smashbros.com/assets_v2/img/fighter/thumb_a/${note.player}.png`;
    //       return note;
    //     });
    //   }, err => {
    //     console.log('error in home')
    //   }, () => {
    //     this.dataLoaded = !this.dataLoaded;
    //   });
    this.getNotesByUser();
    // this.setFallback();
  }

  getNotesByUser() {
    this.noteService.getNotesByUser().then((snapshot) => {
      const data = snapshot.docs.map(doc => {
        console.log(doc);
        return {
          id: doc.id,
          ...doc.data() as Note
        };
      });
      console.log("All data in 'notes' collection for home", data); 
      this.notes = data;
      this.dataLoaded = !this.dataLoaded;
    }, error => {
      console.log(error);
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
        note: note,
        update: true
      }
    });
    return await modal.present();
  }

}

