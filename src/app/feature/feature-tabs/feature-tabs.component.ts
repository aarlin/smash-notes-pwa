import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Note } from 'src/app/shared/interface/note';
import { FeatureMatchupNoteComponent } from '../feature-matchup-note/feature-matchup-note.component';

@Component({
  selector: 'smash-feature-tabs',
  templateUrl: './feature-tabs.component.html',
  styleUrls: ['./feature-tabs.component.scss'],
})
export class FeatureTabsComponent implements OnInit {


  homeIcon: string;
  discoverIcon: string;
  fighterIcon: string;
  notebookIcon: string;
  createIcon: string;

  constructor(public actionSheetController: ActionSheetController, private modalController: ModalController) {}

  ngOnInit() {
    this.homeIcon = 'assets/navigation/ico_top_g.svg';
    this.discoverIcon = 'assets/navigation/ico_howtoplay_g.svg';
    this.fighterIcon = 'assets/navigation/ico_fighter_g.svg';
    this.notebookIcon = 'assets/navigation/ico_blog_g.svg';
    this.createIcon = 'assets/navigation/plus-square-outline.svg';
  }

  getChosenFighter(fighter: string) {
    if (fighter) {
      return `assets/stock-icons/svg/${fighter}.svg`;
    } else {
      return `assets/navigation/ico_fighter_g.svg`;
    }
  }

  displayFighterModal() {
    this.fighterIcon = 'assets/stock-icons/svg/pichu.svg';
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Create',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Create Note',
        icon: 'trash',
        handler: () => {
          this.openNote();
        }
      }, {
        text: 'Create Notebook',
        icon: 'share',
        handler: () => {
          console.log('Create Notebook clicked');
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

  async openNote() {
    let newNote: Note;
    const modal = await this.modalController.create({
      component: FeatureMatchupNoteComponent,
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: 'character-select-modal',
      componentProps: { 
        note: newNote
      }
    });
    return await modal.present();
  }

}
