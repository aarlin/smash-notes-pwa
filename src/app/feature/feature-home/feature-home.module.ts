import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureHomeComponent } from './feature-home.component';
import { IonicModule } from '@ionic/angular';
import { FeatureToolbarModule } from '../feature-toolbar/feature-toolbar.module';
import { NoteService } from 'src/app/services/note.service';

@NgModule({
  declarations: [FeatureHomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    FeatureToolbarModule
  ],
  exports: [FeatureHomeComponent],
  providers: [NoteService]
})
export class FeatureHomeModule { }
