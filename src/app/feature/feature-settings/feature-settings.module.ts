import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureSettingsComponent } from './feature-settings.component';
import { IonicModule } from '@ionic/angular';
import { AuthenicationService } from 'src/app/services/authentication-service';

@NgModule({
  declarations: [FeatureSettingsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FeatureSettingsComponent],
  providers: [AuthenicationService]
})
export class FeatureSettingsModule { }
