import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { FeatureFighterNotesComponent } from './feature-fighter-notes.component';
import { FeatureCharacterSelectModalModule } from '../feature-character-select-modal/feature-character-select-modal.module';
import { FeatureMatchupNoteModule } from '../feature-matchup-note/feature-matchup-note.module';
import { NoteService } from 'src/app/services/note.service';

@NgModule({
  declarations: [FeatureFighterNotesComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedDirectivesModule,
    FeatureCharacterSelectModalModule,
    FeatureMatchupNoteModule
  ],
  exports: [FeatureFighterNotesComponent],
  providers: [NoteService]
})
export class FeatureFighterNotesModule { }
