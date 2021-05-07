import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureFoldersComponent } from './feature-folders.component';
import { FighterService } from 'src/app/services/fighter.service';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { FilterModalModule } from '../feature-filter-select/filter-modal.module';

@NgModule({
  declarations: [
    FeatureFoldersComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedDirectivesModule,
    FilterModalModule,
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
