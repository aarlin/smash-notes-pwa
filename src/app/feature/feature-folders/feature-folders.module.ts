import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureFoldersComponent } from './feature-folders.component';
import { FighterService } from 'src/app/services/fighter.service';



@NgModule({
  declarations: [FeatureFoldersComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FeatureFoldersComponent
  ],
  providers: [
    FighterService
  ]
})
export class FeatureFoldersModule { }
