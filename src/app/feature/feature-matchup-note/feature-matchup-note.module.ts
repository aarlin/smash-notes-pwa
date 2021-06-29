// import '@nutrify/quill-emoji-mart-picker';
import '@nutrify/quill-emoji-mart-picker/esm2015/quill-emoji-mart-picker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureMatchupNoteComponent } from './feature-matchup-note.component';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FighterService } from 'src/app/services/fighter.service';
import { QuillModule } from 'ngx-quill';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [FeatureMatchupNoteComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedPipesModule,
    FormsModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    QuillModule.forRoot(),
    PickerModule,
    EmojiModule
  ],
  exports: [FeatureMatchupNoteComponent],
  providers: [FighterService]
})
export class FeatureMatchupNoteModule { }
