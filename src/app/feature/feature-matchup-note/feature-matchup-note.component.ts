import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { NoteService } from 'src/app/services/note.service';
import { Note } from '../../shared/interface/note.interface';

@Component({
  selector: 'smash-feature-matchup-note',
  templateUrl: './feature-matchup-note.component.html',
  styleUrls: ['./feature-matchup-note.component.scss'],
})
export class FeatureMatchupNoteComponent implements OnInit {
  playerIcon: string;
  enemyIcon: string;
  backArrowIcon: string;

  @Input() note: Note;
  @Input() update: boolean;

  constructor(private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private noteService: NoteService) { }

  ngOnInit() {
    console.log(this.note);
    this.backArrowIcon = `assets/navigation/ico_arrow_s.svg`;
    this.assignIcons();
    // this.playerIcon = `assets/portraits/thumb_h/${this.note.player}.svg`;
    // this.enemyIcon = `assets/portraits/thumb_h/${this.note.enemy}`;
    // this.playerIcon = `assets/portraits/vertical/byleth.webp`;
    // this.enemyIcon = `assets/portraits/vertical/fox.webp`;
  }

  assignIcons() {
    this.note?.player ? 
      this.playerIcon = `assets/stock-icons/svg/${this.note?.player}.svg` :
      this.playerIcon = `assets/navigation/ico_fighter_g.svg`;

    this.note?.enemy ?
      this.enemyIcon = `assets/stock-icons/svg/${this.note?.enemy}.svg`:
      this.enemyIcon = `assets/navigation/ico_fighter_g.svg`;
  }

  changeTitle(event) {
    console.log(event);
    this.note.title = event.target.value
  }

  changePlayer() {
    this.note.player = 'captain_falcon';
  }

  changeEnemy() {
    this.note.enemy = 'mii_swordfighter';
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  // select one least one character
  // does not require title, note
  // category??


  saveNote() {
    console.log(this.note);
    this.update ? this.updateNote(this.note) : this.createNote(this.note);
    this.dismissModal();
  }

  updateNote(note) {
    this.noteService.updateNote(note)
    .then(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  createNote(note) {
    this.noteService.createNote(note)
    .then(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
