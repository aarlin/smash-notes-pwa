import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeatureNotebooksComponent } from './feature-notebooks.component';
import { FighterService } from 'src/app/services/fighter.service';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { FilterModalModule } from '../feature-filter-select/filter-modal.module';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';

@NgModule({
  declarations: [
    FeatureNotebooksComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedDirectivesModule,
    FilterModalModule,
    SharedPipesModule,
  ],
  exports: [
    FeatureNotebooksComponent
  ],
  providers: [
    FighterService
  ]
})
export class FeatureNotebooksModule { }
