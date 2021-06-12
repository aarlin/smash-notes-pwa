import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureDiscoverComponent } from './feature-discover.component';
import { NoteService } from 'src/app/services/note.service';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';



@NgModule({
  declarations: [FeatureDiscoverComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedPipesModule
  ],
  exports: [FeatureDiscoverComponent],
  providers: [NoteService]
})
export class FeatureDiscoverModule { }
