import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureToolbarComponent } from './feature-toolbar.component';



@NgModule({
  declarations: [
    FeatureToolbarComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FeatureToolbarComponent
  ]
})
export class FeatureToolbarModule { }
