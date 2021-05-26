import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureCharacterSelectModalComponent } from './feature-character-select-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FighterService } from 'src/app/services/fighter.service';
import { FighterImagePipe } from 'src/app/shared/pipes/fighter-image.pipe';



@NgModule({
  declarations: [FeatureCharacterSelectModalComponent ],
  exports: [FeatureCharacterSelectModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  providers: [FighterService, FighterImagePipe]
})
export class FeatureCharacterSelectModalModule { }
