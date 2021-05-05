import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureCharacterSelectModalComponent } from './feature-character-select-modal.component';
import { CharacterSelectModalComponent } from './character-select-modal/character-select-modal.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FeatureCharacterSelectModalComponent, CharacterSelectModalComponent ],
  exports: [FeatureCharacterSelectModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class FeatureCharacterSelectModalModule { }
