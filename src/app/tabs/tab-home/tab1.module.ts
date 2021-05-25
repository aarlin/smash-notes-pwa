import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { FeatureToolbarModule } from 'src/app/feature/feature-toolbar/feature-toolbar.module';
import { FeatureHomeModule } from 'src/app/feature/feature-home/feature-home.module';
import { FighterImagePipe } from 'src/app/shared/pipes/fighter-image.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FeatureHomeModule,
    Tab1PageRoutingModule,
    FeatureToolbarModule,
  ],
  declarations: [Tab1Page],
  providers: [FighterImagePipe]
})
export class Tab1PageModule {}
