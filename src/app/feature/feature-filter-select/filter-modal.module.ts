import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterModalComponent } from './filter-modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [FilterModalComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FilterModalComponent]
})
export class FilterModalModule { }
