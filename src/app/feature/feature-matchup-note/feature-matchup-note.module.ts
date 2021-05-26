import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureMatchupNoteComponent } from './feature-matchup-note.component';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FighterService } from 'src/app/services/fighter.service';

@NgModule({
  declarations: [FeatureMatchupNoteComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedPipesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [FeatureMatchupNoteComponent],
  providers: [FighterService]
})
export class FeatureMatchupNoteModule { }
