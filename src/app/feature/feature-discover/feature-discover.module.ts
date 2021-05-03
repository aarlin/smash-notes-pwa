import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureDiscoverComponent } from './feature-discover.component';



@NgModule({
  declarations: [FeatureDiscoverComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FeatureDiscoverComponent]
})
export class FeatureDiscoverModule { }
