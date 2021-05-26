import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NormalizeNamePipe } from './normalize-name.pipe';
import { FighterImagePipe } from './fighter-image.pipe';

@NgModule({
  declarations: [NormalizeNamePipe, FighterImagePipe],
  imports: [
    CommonModule
  ],
  exports: [NormalizeNamePipe, FighterImagePipe]
})
export class SharedPipesModule { }
