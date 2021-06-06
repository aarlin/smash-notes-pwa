import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NoteService } from 'src/app/services/note.service';
import { FighterImagePipe } from 'src/app/shared/pipes/fighter-image.pipe';
import { Note } from '../../shared/interface/note.interface';
import { FeatureCharacterSelectModalComponent } from '../feature-character-select-modal/feature-character-select-modal.component';

@Component({
  selector: 'smash-feature-matchup-note',
  templateUrl: './feature-matchup-note.component.html',
  styleUrls: ['./feature-matchup-note.component.scss'],
})
export class FeatureMatchupNoteComponent implements OnInit {
  playerIcon: string;
  enemyIcon: string;
  backArrowIcon: string;
  uid: string;
  dirty: boolean;

  @Input() note: Note;
  @Input() update: boolean;

  constructor(private modalController: ModalController,
    private noteService: NoteService, private fighterImagePipe: FighterImagePipe, private authenticationService: AuthenticationService,
    public alertController: AlertController,
    public toastController: ToastController) { }

  async ngOnInit() {
    this.backArrowIcon = `assets/navigation/ico_arrow_s.svg`;
    this.assignIcons();
    this.uid = await this.authenticationService.getUid();
  }

  assignIcons() {
    this.note?.player ?
      this.playerIcon = `assets/stock-icons/svg/${this.note?.player}.svg` :
      this.playerIcon = `assets/navigation/ico_fighter_g.svg`;

    this.note?.enemy ?
      this.enemyIcon = `assets/stock-icons/svg/${this.note?.enemy}.svg` :
      this.enemyIcon = `assets/navigation/ico_fighter_g.svg`;
  }

  loadFighterImage(fighterName: string) {
    return this.fighterImagePipe.transform(fighterName, '')
  }

  changeTitle(event) {
    this.note.title = event.target.value;
    this.dirty = true;
  }

  onChange(event: any) {
    this.dirty = true;
  }

  hasOwnership() {
    return this.uid === this.note?.uid;
  }

  onChangeVisibility(event: any) {
  }

  async changePlayer() {
    const modal = await this.modalController.create({
      component: FeatureCharacterSelectModalComponent,
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: 'character-select-modal',
      componentProps: {
        input: 'fighter'
      }
    });
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        this.note.player = modelData.data?.fighter?.name;
        this.assignIcons();
        this.dirty = true;
      }
    });
    return await modal.present();

  }

  async changeEnemy() {
    const modal = await this.modalController.create({
      component: FeatureCharacterSelectModalComponent,
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: 'character-select-modal',
      componentProps: {
        input: 'enemy'
      }
    });
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        this.note.enemy = modelData.data?.fighter?.name;
        this.assignIcons();
        this.dirty = true;
      }
    });
    return await modal.present();

  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    if (!this.dirty) {
      this.modalController.dismiss({
        'dismissed': true, 'note': this.note
      });
    } else {
      this.exitWithoutSaving();
    }

  }

  // select one least one character
  // does not require title, note
  // category??


  saveNote() {
    this.update ? this.updateNote(this.note) : this.createNote(this.note);
    this.dirty = false;
    this.dismissModal();
  }

  deleteNote(note) {
    // TODO: show alert message, delete, dismiss modal, show toast
    this.noteService.deleteNote(note)
    .then(response => {
    }, error => {
    })

  }

  updateNote(note) {
    this.noteService.updateNote(note)
      .then(response => {
      }, error => {
      })
  }

  createNote(note) {
    this.noteService.createNote(note)
      .then(response => {
      }, error => {
      })
  }

  async exitWithoutSaving() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Unsaved',
      message: 'Exit without saving, did you want to save this note?',
      buttons: [
        {
          text: 'No',
          cssClass: 'secondary',
          handler: (blah) => {
            this.dismissModal();
          }
        }, {
          text: 'Yes',
          cssClass: 'danger',
          handler: () => {
            this.dirty = true;
            this.saveNote();
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete',
      message: 'Delete Note',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.deleteNote(this.note);
            this.dirty = false;
            this.dismissModal();
            this.presentToast();
          }
        }
      ]
    });

    await alert.present();
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your note has been deleted.',
      duration: 2000
    });
    toast.present();
  }


}
