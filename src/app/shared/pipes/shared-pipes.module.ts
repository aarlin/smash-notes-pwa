import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NormalizeNamePipe } from './normalize-name.pipe';



@NgModule({
  declarations: [NormalizeNamePipe],
  imports: [
    CommonModule
  ],
  exports: [NormalizeNamePipe]
})
export class SharedPipesModule { }
