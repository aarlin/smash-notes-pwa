import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFloatingActionComponent } from './feature-floating-action.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    FeatureFloatingActionComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FeatureFloatingActionComponent
  ]
})
export class FeatureFloatingActionModule { }
