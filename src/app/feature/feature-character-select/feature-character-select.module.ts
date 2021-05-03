import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCharacterSelectComponent } from './feature-character-select.component';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { FighterService } from 'src/app/services/fighter.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FeatureCharacterSelectComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    IonicSelectableModule
  ],
  exports: [
    FeatureCharacterSelectComponent,
  ],
  providers: [
    FighterService
  ]
})
export class FeatureCharacterSelectModule { }
