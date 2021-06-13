import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NoteService } from 'src/app/services/note.service';
import { FighterImagePipe } from 'src/app/shared/pipes/fighter-image.pipe';
import { Note } from '../../shared/interface/note.interface';
import { FeatureCharacterSelectModalComponent } from '../feature-character-select-modal/feature-character-select-modal.component';

import 'quill-emoji/dist/quill-emoji.js'
// import { emojis } from '@nutrify/ngx-emoji-mart-picker/ngx-emoji/esm5/data/emojis';
import { emojis } from '@ctrl/ngx-emoji-mart/esm2015/ngx-emoji/data/emojis'

import { EmojiEvent } from '@nutrify/ngx-emoji-mart-picker/ngx-emoji/public_api';

import { Emoji } from '@nutrify/quill-emoji-mart-picker/esm2015/emoji.model';


@Component({
  selector: 'smash-feature-matchup-note',
  templateUrl: './feature-matchup-note.component.html',
  styleUrls: ['./feature-matchup-note.component.scss']
})
export class FeatureMatchupNoteComponent implements OnInit {
  playerIcon: string;
  enemyIcon: string;
  backArrowIcon: string;
  uid: string;
  dirty: boolean;
  originalNote: Note;

  modules = {}
  content = ''
  excludeGroups: string[];

  @Input() note: Note;
  @Input() update: boolean;
  set = 'apple';

  formats: string[] = [];
  quill = null;

  visibilityIcon: string;

  customEmojis = [
    {
      name: 'Party Parrot',
      shortNames: ['parrot'],
      keywords: ['party'],
      imageUrl: 'assets/emojis/ButtonIcon-GCN-B.svg',
    },
    {
      name: 'Octocat',
      shortNames: ['octocat'],
      text: '',
      emoticons: [],
      keywords: ['github'],
      imageUrl: 'https://github.githubassets.com/images/icons/emoji/octocat.png',
    }
  ];

  constructor(private modalController: ModalController,
    private noteService: NoteService, private authenticationService: AuthenticationService,
    public alertController: AlertController,
    public toastController: ToastController) {
    this.modules = {
      // 'emoji-module': {
      //   emojiData: emojis,
      //   customEmojiData: this.customEmojis,
      //   preventDrag: true,
      //   showTitle: true,
      //   indicator: '*',
      //   convertEmoticons: true,
      //   convertShortNames: true,
      //   set: () => this.set
      // },
      'emoji-shortname': true,
      'emoji-toolbar': true,
      'toolbar': [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ['clean'],                                         // remove formatting button
        // ['link', 'image', 'video'],                         // link and image, video
        ['link', 'video'],
        // ['emoji']
      ]
    }

    this.formats = ['emoji'];
  }

  async ngOnInit() {
    console.log(this.note);
    this.originalNote = { ...this.note };
    this.backArrowIcon = `assets/navigation/ico_arrow_s.svg`;
    this.assignIcons();
    // this.playerIcon = `assets/portraits/thumb_h/${this.note.player}.svg`;
    // this.enemyIcon = `assets/portraits/thumb_h/${this.note.enemy}`;
    // this.playerIcon = `assets/portraits/vertical/byleth.webp`;
    // this.enemyIcon = `assets/portraits/vertical/fox.webp`;
    this.uid = await this.authenticationService.getUid();
    console.log(this.uid)
    console.log(this.update)
    this.excludeGroups = [
      'search', 'recent', 'people', 'nature', 'foods', 'activity', 'places', 'objects', 'symbols', 'flags'
    ]
    this.visibilityIcon = this.note.visible ? 'eye-outline' : 'eye-off-outline';
  }

  created(quill: any) {
    this.quill = quill;
  }

  assignIcons() {
    console.log('assignIcons')
    this.note?.player ?
      this.playerIcon = `assets/stock-icons/svg/${this.note?.player}.svg` :
      this.playerIcon = `assets/navigation/ico_fighter_g.svg`;

    this.note?.enemy ?
      this.enemyIcon = `assets/stock-icons/svg/${this.note?.enemy}.svg` :
      this.enemyIcon = `assets/navigation/ico_fighter_g.svg`;
  }

  changeTitle(event) {
    console.log(event);
    this.note.title = event.target.value;
    this.dirty = true;
  }

  onChange(event: any) {
    console.log(event);
    this.dirty = true;
  }

  editorChanged(event: any) {
    console.log(event)
    this.dirty = true;
  }

  insertEmoji(event: EmojiEvent) {
    Emoji.insertEmoji(this.quill, event);
  }

  hasOwnership() {
    console.count('hasOwnership')
    return this.uid === this.note?.uid;
  }

  swapCharacters() {
    [this.note.player, this.note.enemy] = [this.note.enemy, this.note.player];
  }

  onChangeVisibility(event: any) {
    console.log(event);
    this.note.visible = event.detail.checked;
    this.visibilityIcon = event.detail.checked ? 'eye-outline' : 'eye-off-outline';
    this.dirty = true;
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
        console.log('Modal Data : ' + JSON.stringify(modelData.data));
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
        console.log('Modal Data : ' + JSON.stringify(modelData.data));

        this.note.enemy = modelData.data?.fighter?.name;
        this.assignIcons();
        this.dirty = true;
      }
    });
    return await modal.present();

  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true, 'note': this.note, 'modified': this.dirty
    });
  }

  dismissNote() {
    if (this.dirty) {
      this.alertExitWithoutSaving();
    } else {
      this.dismissModal();
    }
  }

  // select one least one character
  // does not require title, note
  // category??


  saveNote() {
    console.log(this.note);
    console.log(this.update)
    this.update ? this.updateNote(this.note) : this.createNote(this.note);
    this.modalController.dismiss({
      'dismissed': true, 'note': this.note, 'modified': true
    });
  }

  deleteNote(note) {
    // TODO: show alert message, delete, dismiss modal, show toast
    this.noteService.deleteNote(note)
      .then(response => {
        console.log(response);
      }, error => {
        console.log(error);
      })

  }

  updateNote(note) {
    console.log(note);
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

  async alertExitWithoutSaving() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Unsaved',
      message: 'Exit without saving, did you want to save this note?',
      buttons: [
        {
          text: 'No',
          cssClass: 'secondary',
          handler: () => {
            // console.log(this.note);
            // this.note = { ...this.originalNote };
            // this.note.body = this.originalNote.body;
            // console.log(this.note);
            this.dismissModal();
          }
        }, {
          text: 'Yes',
          cssClass: 'danger',
          handler: () => {
            this.saveNote();
            this.presentToast('Your note has been saved.');
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
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.deleteNote(this.note);
            this.dirty = false;
            this.dismissModal();
            this.presentToast('Your note has been deleted.',);
          }
        }
      ]
    });

    await alert.present();
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


}
