import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  homeIcon: string;
  discoverIcon: string;
  fighterIcon: string;
  notebookIcon: string;
  createIcon: string;

  constructor(public actionSheetController: ActionSheetController) {}

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
          console.log('Create Note clicked');
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

}
