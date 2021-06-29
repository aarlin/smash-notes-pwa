import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NoteService } from 'src/app/services/note.service';
import { FighterImagePipe } from 'src/app/shared/pipes/fighter-image.pipe';
import { Note } from '../../shared/interface/note.interface';
import { FeatureCharacterSelectModalComponent } from '../feature-character-select-modal/feature-character-select-modal.component';

import { EmojiEvent } from '@nutrify/ngx-emoji-mart-picker/ngx-emoji/public_api';

import { Emoji } from '@nutrify/quill-emoji-mart-picker/esm2015/emoji.model';

import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/code_beautifier.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/image_manager.min.js";
import "froala-editor/js/third_party/image_tui.min.js";
import "froala-editor/js/plugins/inline_class.min.js";
import "froala-editor/js/plugins/line_breaker.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/quick_insert.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/url.min.js";
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/js/plugins/word_paste.min.js";


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

  formats: string[] = [];
  quill = null;

  visibilityIcon: string;

  froalaOptions: Object = {
    placeholderText: 'Note body',
    charCounterMax: 1000,
    charCounterCount: true,
    linkInsertButtons: ['linkBack'],
    videoResponsive: true,
    videoResize: false,
    videoMove: false,
    videoDefaultWidth: 200,
    videoInsertButtons: ['videoEmbed'],
    attribution: false,
    quickInsertButtons: ['video', 'embedly'],
    toolbarButtons: [
      ['bold', 'italic', 'underline', 'strikeThrough'],
      ['formatOL', 'formatUL', 'insertTable', 'emoticons', 'embedly', 'insertVideo', 'insertLink'],
    ],
    toolbarSticky: false,
    emoticonsStep: 4,
    emoticonsSet: [{
      id: 'direction',
      name: 'Directions',
      code: '2b06',
      emoticons: [
        { code: '2b06', desc: 'Up Arrow' },
        { code: '2197', desc: 'Up Right Arrow' },
        { code: '27a1', desc: 'Right Arrow' },
        { code: '2198', desc: 'Down Right Arrow' },
        { code: '2b07', desc: 'Down Arrow' },
        { code: '2199', desc: 'Down Left Arrow' },
        { code: '2b05', desc: 'Left Arrow' },
        { code: '2196', desc: 'Up Left Arrow' }
      ]
    }],
  };

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
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        // ['link', 'image', 'video'],                         // link and image, video
        ['link', 'video'],
        // ['emoji']
      ]
    }


    this.formats = ['emoji'];
  }

  async ngOnInit() {
    this.originalNote = { ...this.note };
    this.backArrowIcon = `assets/navigation/ico_arrow_s.svg`;
    this.assignIcons();
    this.uid = await this.authenticationService.getUid();
    this.excludeGroups = [
      'search', 'recent', 'people', 'nature', 'foods', 'activity', 'places', 'objects', 'symbols', 'flags'
    ]
    this.visibilityIcon = this.note?.visible ? 'eye-outline' : 'eye-off-outline';
  }

  editorCreated(quill: any) {
    this.quill = quill;
  }

  assignIcons() {
    this.note?.player ?
      this.playerIcon = `assets/stock-icons/svg/${this.note?.player}.svg` :
      this.playerIcon = `assets/navigation/ico_fighter_g.svg`;

    this.note?.enemy ?
      this.enemyIcon = `assets/stock-icons/svg/${this.note?.enemy}.svg` :
      this.enemyIcon = `assets/navigation/ico_fighter_g.svg`;
  }

  changeTitle(event) {
    this.note.title = event.target.value;
    this.dirty = true;
  }

  onChange(event: any) {
    this.dirty = true;
  }

  editorChanged(event: any) {
    if (!event.html) {
      this.note.body = '';
    }
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
        this.note.player = modelData.data?.fighter?.name ?? '';
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

        this.note.enemy = modelData.data?.fighter?.name ?? '';
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
    this.update ? this.updateNote(this.note) : this.createNote(this.note);
    this.modalController.dismiss({
      'dismissed': true, 'note': this.note, 'modified': true
    });
  }

  deleteNote(note: Note): void {
    // TODO: show alert message, delete, dismiss modal, show toast
    this.noteService.deleteNote(note)
      .then(response => {
        console.log(response);
      }, error => {
        console.log(error);
      })

  }

  updateNote(note: Note): void {
    this.noteService.updateNote(note)
      .then(response => {
        console.log(response);
      }, error => {
        console.log(error);
      })
  }

  createNote(note: Note): void {
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
      duration: 2000,
      position: 'bottom',
      cssClass: 'tabs-bottom'
    });
    toast.present();
  }


}
