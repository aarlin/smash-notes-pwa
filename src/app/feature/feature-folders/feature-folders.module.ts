import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureFoldersComponent } from './feature-folders.component';
import { FighterService } from 'src/app/services/fighter.service';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  declarations: [
    FeatureFoldersComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedDirectivesModule,
    ExploreContainerComponentModule
  ],
  exports: [
    FeatureFoldersComponent
  ],
  providers: [
    FighterService
  ]
})
export class FeatureFoldersModule { }
