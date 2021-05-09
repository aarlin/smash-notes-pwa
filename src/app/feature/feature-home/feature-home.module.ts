import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureHomeComponent } from './feature-home.component';
import { IonicModule } from '@ionic/angular';
import { FeatureToolbarModule } from '../feature-toolbar/feature-toolbar.module';

@NgModule({
  declarations: [FeatureHomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    FeatureToolbarModule
  ],
  exports: [FeatureHomeComponent]
})
export class FeatureHomeModule { }
