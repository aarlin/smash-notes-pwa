import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureHomeComponent } from './feature-home.component';
import { IonicModule } from '@ionic/angular';
import { FeatureToolbarModule } from '../feature-toolbar/feature-toolbar.module';
import { NoteService } from 'src/app/services/note.service';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { MasonryCardComponent } from 'src/app/components/masonry-card/masonry-card.component';


@NgModule({
  declarations: [FeatureHomeComponent, MasonryCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    FeatureToolbarModule,
    SharedPipesModule,
    NgxMasonryModule
  ],
  exports: [FeatureHomeComponent],
  providers: [NoteService]
})
export class FeatureHomeModule { }
