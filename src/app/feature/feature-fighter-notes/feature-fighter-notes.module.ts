import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { FeatureFighterNotesComponent } from './feature-fighter-notes.component';
import { FeatureCharacterSelectModalModule } from '../feature-character-select-modal/feature-character-select-modal.module';

@NgModule({
  declarations: [FeatureFighterNotesComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedDirectivesModule,
    FeatureCharacterSelectModalModule
  ],
  exports: [FeatureFighterNotesComponent]
})
export class FeatureFighterNotesModule { }
