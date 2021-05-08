import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureMatchupNoteComponent } from './feature-matchup-note.component';

@NgModule({
  declarations: [FeatureMatchupNoteComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FeatureMatchupNoteComponent]
})
export class FeatureMatchupNoteModule { }
