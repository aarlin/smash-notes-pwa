import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureTabsComponent } from './feature-tabs.component';
import { NoteService } from 'src/app/services/note.service';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [FeatureTabsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FeatureTabsComponent],
  providers: [NoteService]
})
export class FeatureTabsModule { }
