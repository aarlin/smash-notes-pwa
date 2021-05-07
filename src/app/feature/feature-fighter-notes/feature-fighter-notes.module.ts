import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { FeatureFighterNotesComponent } from './feature-fighter-notes.component';

@NgModule({
  declarations: [FeatureFighterNotesComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedDirectivesModule
  ],
  exports: [FeatureFighterNotesComponent]
})
export class FeatureFighterNotesModule { }
