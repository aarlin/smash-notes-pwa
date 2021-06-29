import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureHomeComponent } from './feature-home.component';
import { IonicModule } from '@ionic/angular';
import { FeatureToolbarModule } from '../feature-toolbar/feature-toolbar.module';
import { NoteService } from 'src/app/services/note.service';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { MasonryCardComponent } from 'src/app/components/masonry-card/masonry-card.component';
import { QuillModule } from 'ngx-quill';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [FeatureHomeComponent, MasonryCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    FeatureToolbarModule,
    SharedDirectivesModule,
    SharedPipesModule,
    NgxMasonryModule,
    QuillModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  exports: [FeatureHomeComponent],
  providers: [NoteService]
})
export class FeatureHomeModule { }
