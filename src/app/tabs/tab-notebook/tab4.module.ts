import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';

import { Tab4PageRoutingModule } from './tab4-routing.module';
import { FeatureToolbarModule } from 'src/app/feature/feature-toolbar/feature-toolbar.module';
import { FeatureFoldersModule } from 'src/app/feature/feature-folders/feature-folders.module';
import { ExploreContainerComponentModule } from 'src/app/feature/explore-container/explore-container.module';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FeatureFoldersModule,
    SharedDirectivesModule,
    ExploreContainerComponentModule,
    FeatureToolbarModule,
    Tab4PageRoutingModule
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule {}
