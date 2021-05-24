import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { FeatureToolbarModule } from 'src/app/feature/feature-toolbar/feature-toolbar.module';
import { FeatureFighterNotesModule } from 'src/app/feature/feature-fighter-notes/feature-fighter-notes.module';
import { FeatureNotebooksModule } from 'src/app/feature/feature-notebooks/feature-notebooks.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FeatureToolbarModule,
    FeatureFighterNotesModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    FeatureNotebooksModule,
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
