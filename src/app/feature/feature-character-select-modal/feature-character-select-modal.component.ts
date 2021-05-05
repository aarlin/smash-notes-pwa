import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CharacterSelectModalComponent } from './character-select-modal/character-select-modal.component';





@Component({
  selector: 'smash-feature-character-select-modal',
  templateUrl: './feature-character-select-modal.component.html',
  styleUrls: ['./feature-character-select-modal.component.scss'],
})
export class FeatureCharacterSelectModalComponent  {


  constructor( public alertController: AlertController, public modalController: ModalController) {}


  async presentModal() {
    const modal = await this.modalController.create({
      component: CharacterSelectModalComponent,
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: 'character-select-modal'
    });
    return await modal.present();
  }


}