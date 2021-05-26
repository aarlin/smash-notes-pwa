import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { FeatureToolbarModule } from 'src/app/feature/feature-toolbar/feature-toolbar.module';
import { FeatureNotebooksModule } from 'src/app/feature/feature-notebooks/feature-notebooks.module';
import { FeatureDiscoverModule } from 'src/app/feature/feature-discover/feature-discover.module';
import { FeatureCharacterSelectModalModule } from 'src/app/feature/feature-character-select-modal/feature-character-select-modal.module';
import { FeatureFloatingActionModule } from 'src/app/feature/feature-floating-action/feature-floating-action.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FeatureNotebooksModule,
    FeatureDiscoverModule,
    FeatureCharacterSelectModalModule,
    FeatureToolbarModule,
    Tab2PageRoutingModule,
    FeatureFloatingActionModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
