import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { FeatureToolbarModule } from 'src/app/feature/feature-toolbar/feature-toolbar.module';
import { FeatureFoldersModule } from 'src/app/feature/feature-folders/feature-folders.module';
import { FeatureDiscoverModule } from 'src/app/feature/feature-discover/feature-discover.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FeatureFoldersModule,
    FeatureDiscoverModule,
    FeatureToolbarModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
