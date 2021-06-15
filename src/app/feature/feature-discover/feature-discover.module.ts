import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureDiscoverComponent } from './feature-discover.component';
import { NoteService } from 'src/app/services/note.service';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { QuillModule } from 'ngx-quill';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { FeatureToolbarModule } from '../feature-toolbar/feature-toolbar.module';



@NgModule({
  declarations: [FeatureDiscoverComponent],
  imports: [
    CommonModule,
    IonicModule,
    FeatureToolbarModule,
    SharedDirectivesModule,
    SharedPipesModule,
    QuillModule
  ],
  exports: [FeatureDiscoverComponent],
  providers: [NoteService]
})
export class FeatureDiscoverModule { }
