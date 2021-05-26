import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoteService } from 'src/app/services/note.service';
import { FeatureMatchupNoteComponent } from '../feature-matchup-note/feature-matchup-note.component';
import { Note } from '../../shared/interface/note.interface';
import { NavigationEnd, Router } from '@angular/router';
import { FighterImagePipe } from 'src/app/shared/pipes/fighter-image.pipe';
import { Fighter } from 'src/app/shared/interface/fighter.interface';

@Component({
  selector: 'smash-feature-home',
  templateUrl: './feature-home.component.html',
  styleUrls: ['./feature-home.component.scss'],
})
export class FeatureHomeComponent implements OnInit {

  dataLoaded: boolean;
  notes: Note[] = [];
  

  constructor(private noteService: NoteService, public modalController: ModalController, private router: Router, private fighterImagePipe: FighterImagePipe) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.getNotesByUser();
      }
    });

  }

  loadFighterImage(fighterName: string) {
    return this.fighterImagePipe.transform(fighterName, '')
  }

  getNotesByUser() {
    this.noteService.getNotesByUser().then((snapshot) => {
      const data = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data() as Note
        };
      });
      console.log("All data in 'notes' collection for home", data);
      this.notes = data;
      this.dataLoaded = !this.dataLoaded;
      console.log(this.dataLoaded);
    }, error => {
      console.log(error);
      this.dataLoaded = !this.dataLoaded;
      console.log(this.dataLoaded);

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
      }
    });
    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      console.log(dataReturned.data);
    });
    return await modal.present();
  }

}

