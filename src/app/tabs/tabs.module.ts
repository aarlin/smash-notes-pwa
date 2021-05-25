import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { FeatureFloatingActionModule } from '../feature/feature-floating-action/feature-floating-action.module';
import { FeatureTabsModule } from '../feature/feature-tabs/feature-tabs.module';
import { FighterService } from '../services/fighter.service';
import { FighterImagePipe } from '../shared/pipes/fighter-image.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    FeatureFloatingActionModule,
    FeatureTabsModule
  ],
  declarations: [TabsPage],
  providers: [FighterService, FighterImagePipe]
})
export class TabsPageModule {}
