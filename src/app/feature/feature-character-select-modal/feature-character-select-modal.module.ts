import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureCharacterSelectModalComponent } from './feature-character-select-modal.component';
import { CharacterSelectModalComponent } from './character-select-modal/character-select-modal.component';



@NgModule({
  declarations: [FeatureCharacterSelectModalComponent, CharacterSelectModalComponent ],
  exports: [FeatureCharacterSelectModalComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class FeatureCharacterSelectModalModule { }
