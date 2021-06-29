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
    charCounterCount: false,
    fileUpload: false,
    fileBrowse: false,
    attribution: false,
    toolbarButtons: [
      ['bold', 'italic', 'underline', 'strikeThrough'],
      ['specialCharacters'],
      ['formatOL', 'formatUL', 'emoticons', 'fontAwesome', 'embedly'],
      ['insertImage', 'insertVideo', 'embedly', 'insertTable', 'insertLink'],
    ],
    toolbarSticky: false,
    emoticonsStep: 4,
    emoticonsSet: [{
      id: 'people',
      name: 'Smileys & People',
      code: '1f600',
      emoticons: [
        { code: '1f600', desc: 'Grinning face' },
        { code: '1f601', desc: 'Grinning face with smiling eyes' },
        { code: '1f602', desc: 'Face with tears of joy' },
        { code: '1f603', desc: 'Smiling face with open mouth' },
        { code: '1f604', desc: 'Smiling face with open mouth and smiling eyes' },
        { code: '1f605', desc: 'Smiling face with open mouth and cold sweat' },
        { code: '1f606', desc: 'Smiling face with open mouth and tightly-closed eyes' },
        { code: '1f607', desc: 'Smiling face with halo' }
      ]
    }, {
      'id': 'nature',
      'name': 'Animals & Nature',
      'code': '1F435',
      'emoticons': [
        { code: '1F435', desc: 'Monkey Face' },
        { code: '1F412', desc: 'Monkey' },
        { code: '1F436', desc: 'Dog Face' },
        { code: '1F415', desc: 'Dog' },
        { code: '1F429', desc: 'Poodle' },
        { code: '1F43A', desc: 'Wolf Face' },
        { code: '1F431', desc: 'Cat Face' },
        { code: '1F408', desc: 'Cat' },
        { code: '1F42F', desc: 'Tiger Face' },
        { code: '1F405', desc: 'Tiger' },
        { code: '1F406', desc: 'Leopard' },
        { code: '1F434', desc: 'Horse Face' },
        { code: '1F40E', desc: 'Horse' },
        { code: '1F42E', desc: 'Cow Face' },
        { code: '1F402', desc: 'Ox' },
        { code: '1F403', desc: 'Water Buffalo' },
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
