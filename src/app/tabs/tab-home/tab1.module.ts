import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../../feature/explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { FeatureFilterSelectModule } from 'src/app/feature/feature-filter-select/feature-filter-select.module';
import { FeatureToolbarModule } from 'src/app/feature/feature-toolbar/feature-toolbar.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    FeatureToolbarModule,
    FeatureFilterSelectModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
