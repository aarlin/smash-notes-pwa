import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFilterSelectComponent } from './feature-filter-select.component';
import { IonicModule } from '@ionic/angular';
import { FilterModalComponent } from './filter-modal/filter-modal.component';



@NgModule({
  declarations: [FeatureFilterSelectComponent, FilterModalComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FeatureFilterSelectComponent
  ]
})
export class FeatureFilterSelectModule { }
