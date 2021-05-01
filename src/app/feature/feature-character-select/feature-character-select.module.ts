import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCharacterSelectComponent } from './feature-character-select.component';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { FightersService } from 'src/app/services/fighters.service';
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
    FightersService
  ]
})
export class FeatureCharacterSelectModule { }
