import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCharacterSelectComponent } from './feature-character-select.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    FeatureCharacterSelectComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FeatureCharacterSelectComponent
  ]
})
export class FeatureCharacterSelectModule { }
