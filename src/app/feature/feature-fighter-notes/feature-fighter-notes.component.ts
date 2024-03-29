import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { NoteService } from 'src/app/services/note.service';
import { FeatureCharacterSelectModalComponent } from '../feature-character-select-modal/feature-character-select-modal.component';
import { FeatureMatchupNoteComponent } from '../feature-matchup-note/feature-matchup-note.component';
import { Note } from '../../shared/interface/note.interface';
import { NavigationEnd, Router } from '@angular/router';
import { Fighter } from 'src/app/shared/interface/fighter.interface';

interface ChunkedData {
  [key: string]: Note[];
}

@Component({
  selector: 'smash-feature-fighter-notes',
  templateUrl: './feature-fighter-notes.component.html',
  styleUrls: ['./feature-fighter-notes.component.scss'],
})
export class FeatureFighterNotesComponent implements OnInit {

  background: string;
  fighterImage: string;
  fighterSeriesIcon: string;
  fighterIcon: string;

  dataLoaded: boolean;

  notes: Note[] = [];

  chunkedData: ChunkedData;

  homeIcon: string;

  @Input() fighter: Fighter;

  searchBarEnabled = false;
  searchValue: string;

  constructor(public alertController: AlertController,
    public modalController: ModalController,
    private noteService: NoteService, private router: Router) { }

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
    console.log(this.fighter);

    this.setSeriesIcon(this.fighter);
    this.setBackgroundImage(this.fighter);
    this.getNotesByFighter(this.fighter.name);


    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.getNotesByFighter(this.fighter.name);
      }
    });

  }

  getNotesByFighter(fighterName) {
    this.noteService.getNotesByFighter(fighterName)
    .then((snapshot) => {
      const data = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data() as Note
        };
      });
      console.log("All data in 'notes' collection for fighter: ", fighterName.name, data);
      this.notes = data;
      this.dataLoaded = !this.dataLoaded;
    }, error => {
      console.log(error);
      this.dataLoaded = !this.dataLoaded;
    });
  }

  setBackgroundImage(fighter: Fighter) {
    console.log('setBackgroundImage')
    this.background = `assets/background/${fighter.name}.jpg`;
    this.fighterImage = `assets/portraits/fighter_image/${fighter.name}.png`;

    if (fighter.name.includes('mii')) {
      this.background = `https://www.smashbros.com/assets_v2/img/fighter/mii_fighter/bg.jpg`;
    }
  }

  setSeriesIcon(fighter: Fighter) {
    console.log('setSeriesIcon')
    this.fighterSeriesIcon = `assets/series-symbols/series-logo/${fighter.name}.svg`;
  }

  close() {
    console.log('close')
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  searchFighterNotes() {
    
  }

  async openNote(note: Note) {
    console.log('open note from fighter notes')
    console.log(note);
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

  dismissModal() {
    console.log('dismiss')

    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
