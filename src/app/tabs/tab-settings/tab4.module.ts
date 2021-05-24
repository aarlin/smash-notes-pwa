import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';

import { Tab4PageRoutingModule } from './tab4-routing.module';
import { FeatureToolbarModule } from 'src/app/feature/feature-toolbar/feature-toolbar.module';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { FeatureSettingsModule } from 'src/app/feature/feature-settings/feature-settings.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedDirectivesModule,
    FeatureToolbarModule,
    Tab4PageRoutingModule,
    FeatureSettingsModule
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule {}
