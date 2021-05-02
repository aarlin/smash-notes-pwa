import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureFoldersComponent } from './feature-folders.component';



@NgModule({
  declarations: [FeatureFoldersComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FeatureFoldersComponent
  ]
})
export class FeatureFoldersModule { }
