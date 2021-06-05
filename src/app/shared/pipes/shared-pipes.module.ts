import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NormalizeNamePipe } from './normalize-name.pipe';
import { FighterImagePipe } from './fighter-image.pipe';
import { VirtualListIndexPipe } from './virtual-list-index.pipe';

@NgModule({
  declarations: [NormalizeNamePipe, FighterImagePipe, VirtualListIndexPipe],
  imports: [
    CommonModule
  ],
  exports: [NormalizeNamePipe, FighterImagePipe, VirtualListIndexPipe]
})
export class SharedPipesModule { }
